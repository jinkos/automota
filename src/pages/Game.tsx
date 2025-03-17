import { useState } from "react";
import { loadUserName } from '../lib/persist.ts';
import gameSchema from '../assets/game_schema.json'

// interface GameSchema {
//     [key: string]: {
//         [key: string]: {
//             result: string;
//             message: string;
//         };
//     };
// }

function Game() {

    const [gameResult, setGameResult] = useState<string>('');
    const [gameMessage, setGameMessage] = useState<string>('');
    const [myScore, setMyScore] = useState<number>(0);
    const [compScore, setCompScore] = useState<number>(0);

    const userName = loadUserName();

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

    const gameOpList = gameOptions.map((option) => {
        return <button
            key={option}
            onClick={() => handleChoose(option)}
        >
            {option}
        </button>
    }
    );

    return (
        <>
            <h1>{greetingStr}</h1>
            <h2>Choose your weapon...</h2>
            {gameOpList}
            <h2>{gameResult}</h2>
            <p>{gameMessage}</p>
            <h2>Score</h2>
            <p>{userName}: {myScore}</p>
            <p>Computer: {compScore}</p>
            <button onClick={() => window.location
                .href = window.location.hostname}>
                Restart
            </button>
        </>
    )
}

export default Game
