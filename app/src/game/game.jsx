import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addPlayer, useGame } from "../api";
import "./game.scss";

import PlayerCard from "./playercard";

function Game() {
  const { id } = useParams();

  let [newPlayerName, setNewPlayerName] = useState("");

  const { data: gameData, errors, loaded, update } = useGame(id);

  const forceUpdate = () => {
    update();
  };

  const onAddPlayer = (name) => {
    addPlayer(gameData.pk, name).then(({ data }) => {
      forceUpdate();
    });
  };

  useEffect(() => {
    let h = setInterval(forceUpdate, 500);

    return () => {
      clearInterval(h);
    };
  }, []);

  if (!loaded) {
    return "loading...";
  }

  return (
    <>
      <div className="row margin-small">
        <h2 id="game_id_label">{"Game ID: " + gameData.pk}</h2>
      </div>

      <div className="row margin-small" id="add_new_player_container">
        <div>Add new player:</div>
      </div>

      <div className="row margin-extra-small">
        <div>
          <input
            type="text"
            onChange={(e) => setNewPlayerName(e.target.value)}
            value={newPlayerName}
            id="player_name_input"
          ></input>
          <button
            id="player_name_enter_button"
            onClick={() => {
              onAddPlayer(newPlayerName);
              setNewPlayerName("");
            }}
          >
            +
          </button>
        </div>
      </div>

      {gameData.players.map((player) => (
        <PlayerCard
          key={player.name}
          gameData={gameData}
          player={player}
          forceUpdate={forceUpdate}
        ></PlayerCard>
      ))}
    </>
  );
}

export default Game;
