import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createPlayer, useGame, removePlayer } from "../api";
import "./game.scss";

import PlayerCard from "./playercard";
import { ConfirmationModal, AlertModal, QRModal } from "../modals/modals";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopy,
    faQrcode
} from "@fortawesome/free-solid-svg-icons";

import QRCode from 'qrcode';

function Game() {
    const { id } = useParams();
    let [confirmModalOpen, setConfirmModalOpen] = useState(false);
    let [alertModalOpen, setAlertModalOpen] = useState(false);
    let [qrModalOpen, setQRModalOpen] = useState(false);
    let [playerToDelete, setPlayerToDelete] = useState("");

    let [newPlayerName, setNewPlayerName] = useState("");

    const gameData = useGame(id);

    const onAddPlayer = (name) => {
        let playerNameTaken = false;
        if (gameData.players.length > 0) {
            playerNameTaken =
                gameData.players.filter((p) => p.name === name).length > 0;
        }

        if (playerNameTaken === false) {
            createPlayer(gameData.id, name).then(({ data }) => {

            });
        } else {
            setAlertModalOpen(true);
        }
    };

    const getGameUrl = () => `${window.location.origin}/game/${gameData.id}`


    useEffect(() => {
        if (qrModalOpen) {
            let canvas = document.getElementById("qrcode");
            QRCode.toCanvas(canvas, getGameUrl(), function (error) { })
        }
    }, [qrModalOpen])

    const openQR = () => {
        setQRModalOpen(true);
    }

    const onDeleteRequest = (name) => {
        setConfirmModalOpen(true);
        setPlayerToDelete(name);
    };

    const deletePlayer = (name) => {
        removePlayer(gameData.id, name)
            .then(() => {
                setConfirmModalOpen(false);
            });
    };

    if (!gameData) {
        return (
            <div className="row margin-large">
                <h4>loading...</h4>
            </div>
        );
    }

    return (
        <>
            <span className={(confirmModalOpen || alertModalOpen || qrModalOpen) ? "disabled" : ""}>
                <div className="row margin-small">
                    <h2 id="game_id_label">{"Game ID: " + gameData.id}</h2>
                </div>

                <div className="row">
                    <div>
                        <button className="action_button" id="copy_button" onClick={() => navigator.clipboard.writeText(getGameUrl())}>
                            <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
                        </button>
                        <button className="action_button" id="qr_button" onClick={() => openQR()}>
                            <FontAwesomeIcon icon={faQrcode}></FontAwesomeIcon>
                        </button>
                    </div>
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

            {qrModalOpen && (
                <QRModal
                    confirmAction={() => {
                        setQRModalOpen(false);
                    }}
                ></QRModal>
            )}
        </>
    );
}

export default Game;
