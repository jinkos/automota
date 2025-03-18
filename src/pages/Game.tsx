import { useState } from "react";
import { loadScore, saveScore, loadUserName, Score } from '../lib/persist.ts';
import { Button, ButtonGroup } from "@mui/material";

import gameSchemaJson from '../assets/game_schema.json';

// the game schema is the only things with a remotely complex type
interface GameSchema {
    [key: string]: {
        [key: string]: {
            result: string;
            message: string;
        };
    };
}

function Game() {

    const [gameResult, setGameResult] = useState<string>('');
    const [gameMessage, setGameMessage] = useState<string>('');
    const [score, setScore] = useState<Score>(loadScore());

    const userName: string = loadUserName();

    const gameSchema: GameSchema = gameSchemaJson;
    const gameOptions = Object.keys(gameSchema)

    const handleChoose = (option: string) => {
        const randomOption = gameOptions[Math.floor(Math.random() * gameOptions.length)];

        const result = gameSchema[option][randomOption].result;
        const message = gameSchema[option][randomOption].message;

        if (result === 'Win') {
            const newScore = { myScore: score.myScore + 1, compScore: score.compScore };
            saveScore(newScore);
            setScore(newScore);
        } else if (result === 'Lose') {
            const newScore = { myScore: score.myScore, compScore: score.compScore + 1 };
            saveScore(newScore);
            setScore(newScore);
        }

        setGameResult(result);
        setGameMessage(message);
    }

    const handleRestart = () => {
        saveScore({ myScore: 0, compScore: 0 });
        window.location.href =
            window.location.hostname
    }

    const greetingStr = `Hello ${userName}`;

    const gameOptionButtonList = gameOptions.map((option) => {
        return <Button
            key={option}
            onClick={() => handleChoose(option)}
            variant="contained"
        >
            {option}
        </Button>
    }
    );

    return (
        <>
            <Button onClick={handleRestart}
                variant="contained"
            >
                Restart
            </Button>
            <h1>{greetingStr}</h1>
            <h2>Choose your weapon...</h2>
            <ButtonGroup orientation="vertical" variant="contained" aria-label="Basic button group">
                {gameOptionButtonList}
            </ButtonGroup>
            <h2>{gameResult}</h2>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <h3>{userName}: {score.myScore}</h3>
                <h3>Computer: {score.compScore}</h3>
            </div>
            <p>{gameMessage}</p>
        </>
    )
}

export default Game
