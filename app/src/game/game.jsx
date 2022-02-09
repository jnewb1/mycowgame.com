import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addPlayer, removePlayer, playerAction, useGame } from "../api";

import "./game.scss";
import PlayerCard from "./playercard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Game() {
  const { id } = useParams();

  let [newPlayerName, setNewPlayerName] = useState("");

  const { data, errors, loaded, update } = useGame(id);

  const forceUpdate = () => {
    update();
  };

  const onAddPlayer = (name) => {
    addPlayer(data.pk, name).then(({ data }) => {
      forceUpdate();
    });
  };

  const onRemovePlayer = (name) => {
    removePlayer(data.pk, name).then(({ data }) => {
      forceUpdate();
    });
  };

  const onPlayerAction = (name, action) => {
    playerAction(data.pk, name, action).then(({ data }) => {
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
      <div className="row">
        <h1>{data.pk}</h1>
        {data.players.map((player) => (
          <div>
            {player.name} {player.points}
            {data.actions.map((action) => (
              <div onClick={() => onPlayerAction(player.name, action.name)}>
                {action.name}
              </div>
            ))}
            <div onClick={() => onRemovePlayer(player.name)}>Delete</div>
          </div>
        ))}
        <div>
          <input
            type="text"
            onChange={(e) => setNewPlayerName(e.target.value)}
            value={newPlayerName}
          ></input>
          <button
            onClick={() => {
              onAddPlayer(newPlayerName);
              setNewPlayerName("");
            }}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="row margin-large">
        <button className="button">Add Player</button>
      </div>
      <PlayerCard /> */
}

export default Game;
