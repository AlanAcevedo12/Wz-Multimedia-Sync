import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from "./pages/Landing/Landing";
import Audio from "./pages/Audio/Audio";
import Video from "./pages/Video/Video";
import { useState } from 'react';

function App() {
    const [ip, setIp] = useState(localStorage.getItem("ip"));

  return (
    <div className="App">
        <Routes>
            <Route 
                excact
                path="/"
                element={<Landing ip={ip} setIp={setIp} />}
            />
            <Route 
                path="/audio"
                element={<Audio ip={ip}/>}
            />
            <Route 
                path="/video"
                element={<Video ip={ip}/>}
            />
        </Routes>
    </div>
  );
}

export default App;
