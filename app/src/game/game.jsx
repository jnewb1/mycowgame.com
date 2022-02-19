import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addPlayer, useGame, removePlayer } from "../api";
import "./game.scss";

import PlayerCard from "./playercard";
import { ConfirmationModal, AlertModal } from "../modals/modals";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy
} from "@fortawesome/free-solid-svg-icons";

function Game() {
  const { id } = useParams();
  let [confirmModalOpen, setConfirmModalOpen] = useState(false);
  let [alertModalOpen, setAlertModalOpen] = useState(false);
  let [playerToDelete, setPlayerToDelete] = useState("");

  let [newPlayerName, setNewPlayerName] = useState("");

  const { data: gameData, errors, loaded, update } = useGame(id);

  const forceUpdate = () => {
    update();
  };

  const onAddPlayer = (name) => {
    let playerNameTaken = false;
    if (gameData.players.length > 0) {
      playerNameTaken =
        gameData.players.filter((p) => p.name === name).length > 0;
    }

    console.log("Hello", playerNameTaken);

    if (playerNameTaken === false) {
      addPlayer(gameData.pk, name).then(({ data }) => {
        forceUpdate();
      });
    } else {
      setAlertModalOpen(true);
    }
  };

  const onDeleteRequest = (name) => {
    setConfirmModalOpen(true);
    setPlayerToDelete(name);
  };

  const deletePlayer = (name) => {
    removePlayer(gameData.pk, name)
      .then(({ data }) => {
        forceUpdate();
      })
      .then(() => {
        setConfirmModalOpen(false);
      });
  };

  useEffect(() => {
    let h = setInterval(forceUpdate, 500);

    return () => {
      clearInterval(h);
    };
  }, []);

  if (!loaded) {
    return (
      <div className="row margin-large">
        <h4>loading...</h4>
      </div>
    );
  }

  return (
    <>
      <span className={confirmModalOpen || alertModalOpen ? "disabled" : ""}>
        <div className="row margin-small">
          <h2 id="game_id_label">{"Game ID: " + gameData.pk}</h2><button onClick={() => navigator.clipboard.writeText(gameData.pk)}><FontAwesomeIcon icon={faCopy}></FontAwesomeIcon></button>
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
            <input
              id="player_name_enter_button"
              onClick={() => {
                onAddPlayer(newPlayerName);
                setNewPlayerName("");
              }}
              type="submit"
              value={"+"}
            ></input>
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

      {confirmModalOpen && (
        <ConfirmationModal
          prompt={"Confirm Delete Player"}
          confirmAction={() => {
            deletePlayer(playerToDelete);
          }}
          cancelAction={() => {
            setConfirmModalOpen(false);
          }}
        ></ConfirmationModal>
      )}

      {alertModalOpen && (
        <AlertModal
          prompt={`Error - Duplicate Name`}
          confirmAction={() => {
            setAlertModalOpen(false);
          }}
        ></AlertModal>
      )}
    </>
  );
}

export default Game;
