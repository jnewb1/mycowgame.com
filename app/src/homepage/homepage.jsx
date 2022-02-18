import { useNavigate } from "react-router-dom";
import { createGame } from "../api";

import "./homepage.scss";

function Homepage() {
  const navigate = useNavigate();

  const createNewGame = () => {
    createGame().then(({ data }) => {
      navigate(`/game/${data.pk}`);
    });
  };

  return (
    <>
      <div className="row">
        <h1 id="homepage_subtitle">The cow-collecting road trip game</h1>
      </div>

      <div className="row margin-medium">
        <button className="main-menu-button" onClick={createNewGame}>
          Create New Game
        </button>
      </div>

      <div className="row margin-small">
        <button className="main-menu-button" onClick={() => navigate("/join")}>
          Join Existing Game
        </button>
      </div>

      <div className="row margin-small">
        <button
          className="main-menu-button"
          onClick={() => navigate("/how-to-play")}
        >
          How To Play
        </button>
      </div>
    </>
  );
}

export default Homepage;
