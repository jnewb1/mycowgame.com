import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addPlayer, useGame, removePlayer } from "../api";
import "./game.scss";

import PlayerCard from "./playercard";
import ConfirmationModal from "../modals/modals";

function Game() {
  const { id } = useParams();
  let [modalOpen, setModalOpen] = useState(false);
  let [playerToDelete, setPlayerToDelete] = useState("");

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

  const onDeleteRequest = (name) => {
    setModalOpen(true);
    setPlayerToDelete(name);
  };

  const deletePlayer = (name) => {
    removePlayer(gameData.pk, name)
      .then(({ data }) => {
        forceUpdate();
      })
      .then(() => {
        setModalOpen(false);
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
      <span className={modalOpen ? "disabled" : ""}>
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
            onDeleteRequest={onDeleteRequest}
          ></PlayerCard>
        ))}
      </span>

      {modalOpen && (
        <ConfirmationModal
          prompt={"Confirm Delete Player"}
          confirmAction={() => {
            deletePlayer(playerToDelete);
          }}
          cancelAction={() => {
            setModalOpen(false);
          }}
        ></ConfirmationModal>
      )}
    </>
  );
}

export default Game;
