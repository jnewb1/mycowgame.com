import { Routes, Route } from "react-router-dom";
import MetaTags from "react-meta-tags";

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
  const TITLE = "My Cow Game - The competitive cow-collecting road trip game";
  const DESCRIPTION =
    "The best road trip game, whether you're in a city or the middle of nowhere. Score points by spotting, marrying and killing cows (and other large animals)";

  return (
    <>
      <MetaTags>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <link rel="canonical" href="/" />
      </MetaTags>

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
