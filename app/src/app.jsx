import { Routes, Route } from "react-router-dom";

// Style
import "./style/components.scss";
import "./style/layouts.scss";

// Custom Components
import Homepage from "./homepage/homepage";
import Game from "./game/game";
import JoinGame from "./join_game/join_game";
import Nav from "./nav";
import HowToPlay from "./how_to_play/how_to_play";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
