import { useState, useEffect } from 'react';
import { saveUserName, loadUserName } from '../lib/persist.ts';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import GithubLink from '../lib/githubLink.tsx';

function Welcome() {

    const [userName, setName] = useState<string>(loadUserName());

    const navigate = useNavigate();

    useEffect(() => {
        const userName = loadUserName();
        setName(userName);
    }, []);

    const handlePlay = () => {

        if (!userName) return;
        if (userName.length === 0) return;

        // const url_str = window.location.hostname + "#/game";
        saveUserName(userName);
        navigate("game")
    };

    return (
        <>
            <GithubLink />
            <h1>Welcome</h1>
            <h2>Tell me your name and</h2>
            <h2>let's get this party started with a Big Bang</h2>
            <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter")
                        handlePlay();
                }}
            />
            <div style={{ height: '10px' }} />
            <Button
                onClick={handlePlay}
                variant="contained"
            >
                Play
            </Button>
        </>
    );
}

export default Welcome
