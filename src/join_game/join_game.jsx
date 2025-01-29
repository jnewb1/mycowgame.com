import "./join_game.scss";

import { getGame } from "../api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JoinGame = function () {
    const [gameID, setGameID] = useState("");
    const navigate = useNavigate();

    function onJoinGame() {
        getGame(gameID).then((game) => {
            if (game.data.length) {
                navigate(`/game/${gameID}`);
            } else {
                window.alert(
                    "ERROR - Invalid key, game does not exist\nKey should be 5 characters long"
                );
            }
        });
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
                    onInput={(e) => setGameID(e.target.value)}
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

            <div className="row margin-small">
                <button className="main-menu-button" onClick={() => navigate("/")}>
                    Return to Homepage
                </button>
            </div>
        </>
    );
};

export default JoinGame;
