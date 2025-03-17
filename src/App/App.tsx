import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Automota from '../pages/Automota';
import Game from '../pages/Game';

import './App.css';

function App() {
    return (
        <div className='App'>
        <div>
            <Router>
                <Routes>
                    <Route path="/" element=<Welcome /> />
                    <Route path="/game" element=<Game /> />
                    <Route path="/automota" element=<Automota /> />
                </Routes>
            </Router>
        </div>
        </div>
    )
}

export default App
