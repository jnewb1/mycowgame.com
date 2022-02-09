import { useNavigate } from "react-router-dom";
import { createGame } from "../api";

function Homepage() {
  const navigate = useNavigate();

  const createNewGame = () => {
    createGame().then(({ data }) => {
      navigate(`/game/${data.pk}`);
    });
  };

  return (
    <>
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
        <button className="main-menu-button">How To Play</button>
      </div>
    </>
  );
}

export default Homepage;
