import { useState } from "react";
import { loadUserName } from '../lib/persist.ts';
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
    const [myScore, setMyScore] = useState<number>(0);
    const [compScore, setCompScore] = useState<number>(0);

    const userName: string = loadUserName();

    const gameSchema: GameSchema = gameSchemaJson;
    const gameOptions = Object.keys(gameSchema)

    const handleChoose = (option: string) => {
        const randomOption = gameOptions[Math.floor(Math.random() * gameOptions.length)];

        const result = gameSchema[option][randomOption].result;
        const message = gameSchema[option][randomOption].message;

        if (result === 'Win') {
            setMyScore(myScore + 1);
        } else if (result === 'Lose') {
            setCompScore(compScore + 1);
        }

        setGameResult(result);
        setGameMessage(message);
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
            <Button onClick={() => window.location.href =
                window.location.hostname}
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
                <h3>{userName}: {myScore}</h3>
                <h3>Computer: {compScore}</h3>
            </div>
            <p>{gameMessage}</p>
        </>
    )
}

export default Game
