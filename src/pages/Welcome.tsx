import { useState, useEffect } from 'react';
import { saveUserName, loadUserName } from '../lib/persist.ts';

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
        <>
            <h1>Welcome</h1>
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
            <button onClick={handlePlay}>Play</button>
        </>
    );
}

export default Welcome
