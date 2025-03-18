import { useState, useEffect } from 'react';
import { saveUserName, loadUserName } from '../lib/persist.ts';
import { Button } from "@mui/material";

function Welcome() {

    const [userName, setName] = useState<string>(loadUserName());

    useEffect(() => {
        const userName = loadUserName();
        setName(userName);
    }, []);

    const handlePlay = () => {
        const url_str = window.location.hostname + "#/game";
        saveUserName(userName);
        window.location.href = url_str;
    };

    return (
        <div style={{ textAlign: 'center', flexDirection: 'column' }}>
            <h1>Welcome</h1>
            <h2>Tell me your name and let's get this party started with a Big Bang</h2>
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
        </div>
    );
}

export default Welcome
