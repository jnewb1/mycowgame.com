import "./join_game.scss";

import { getGame } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinGame = function () {
  const [gameKey, setGameKey] = useState("");
  const navigate = useNavigate();

  function onJoinGame() {
    getGame({ pk: gameKey }).then((response) => {
      if (response.ok) {
        navigate(`/game/${gameKey}`);
      } else {
        window.alert(
          "ERROR - Invalid key, game does not exist\nKey should be 8 characters long"
        );
      }
    });

    console.log("join");
  }

  return (
    <>
      <div className="row margin-small">
        <h3 id="join_game_instructions">Enter existing game key:</h3>
      </div>

      <div className="row margin-small">
        <input
          id="key_input_box"
          type="text"
          onInput={(e) => setGameKey(e.target.value)}
        />
      </div>

      <div className="row margin-small">
        <button
          className="main-menu-button"
          id="key_confirm_button"
          onClick={onJoinGame}
        >
          Join Game
        </button>
      </div>
    </>
  );
};

export default JoinGame;
