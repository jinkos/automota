import { useState } from "react";
import { loadScore, saveScore, loadUserName, Score } from '../lib/persist.ts';
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import gameSchemaJson from '../assets/game_schema.json';
import GithubLink from "../lib/githubLink.tsx";

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
    const [compChoice, setCompChoice] = useState<string>('');
    const [score, setScore] = useState<Score>(loadScore());

    const navigate = useNavigate();

    const userName: string = loadUserName();

    const gameSchema: GameSchema = gameSchemaJson;
    const gameOptions = Object.keys(gameSchema)

    const handleChoose = (option: string) => {
        const randomOption = gameOptions[Math.floor(Math.random() * gameOptions.length)];
        setCompChoice(randomOption);

        const result = gameSchema[option][randomOption].result;
        const message = gameSchema[option][randomOption].message;

        if (result === 'Win') {
            const newScore = { myScore: score.myScore + 1, compScore: score.compScore };
            saveScore(newScore);
            setScore(newScore);
            setGameResult("You Win!");
        } else if (result === 'Lose') {
            const newScore = { myScore: score.myScore, compScore: score.compScore + 1 };
            saveScore(newScore);
            setScore(newScore);
            setGameResult("You Lose!");
        } else {
            setGameResult("It's a draw!");
        }

        setGameMessage(message);
    }

    const handleRestart = () => {
        saveScore({ myScore: 0, compScore: 0 });
        navigate("/")

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

    const restartArea = () => {
        return (
            < div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <GithubLink />
                <Button onClick={handleRestart}
                    variant="contained"
                >
                    Restart
                </Button>
            </div >
        )
    }

    const gameArea = () => {
        return (
            <>
                <h2>Choose your weapon...</h2>
                <ButtonGroup orientation="vertical" variant="contained" aria-label="Basic button group">
                    {gameOptionButtonList}
                </ButtonGroup>
            </>
        )
    }

    const scoreArea = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <h3>{userName}: {score.myScore}</h3>
                <h3>Computer: {score.compScore}</h3>
            </div>
        )
    }

    const resultArea = () => {
        if (gameResult === '') return null;

        return (
            <>
                <h2>I choose {compChoice}</h2>
                <h2>{gameResult}</h2>
                <p>{gameMessage}</p>
            </>
        )
    }

    return (
        <>
            {restartArea()}
            <h1>{greetingStr}</h1>
            {scoreArea()}
            {gameArea()}
            {resultArea()}
        </>
    )
}

export default Game
