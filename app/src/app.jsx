import { Routes, Route } from "react-router-dom";

// Style
import "./style/components.scss";
import "./style/layouts.scss";

// Custom Components
import Homepage from "./homepage/homepage";
import Game from "./game/game";
import Nav from "./nav";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
