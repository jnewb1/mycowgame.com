import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createPlayer, useGame, removePlayer } from "../api";
import "./game.scss";

import PlayerCard from "./playercard";
import { ConfirmationModal, AlertModal, QRModal, ScoreGraphModal } from "../modals/modals";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopy,
    faQrcode,
    faChartLine,
} from "@fortawesome/free-solid-svg-icons";

import QRCode from 'qrcode';

function Game() {
    const { id } = useParams();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [alertModalOpen, setAlertModalOpen] = useState(false);
    const [qrModalOpen, setQRModalOpen] = useState(false);
    const [scoreGraphModalOpen, setScoreGraphModalOpen] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState("");
    const [newPlayerName, setNewPlayerName] = useState("");

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

    const getGameUrl = () => `${window.location.origin}/game/${gameData.id}`;


    useEffect(() => {
        if (qrModalOpen) {
            const canvas = document.getElementById("qrcode");
            QRCode.toCanvas(canvas, getGameUrl(), function (error) { });
        }
    }, [qrModalOpen]);

    const openQR = () => {
        setQRModalOpen(true);
    };

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

    const onShowScoreGraphs = () => {
        setScoreGraphModalOpen(true);
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
            <span className={(confirmModalOpen || alertModalOpen || qrModalOpen || scoreGraphModalOpen) ? "disabled" : ""}>

                <div className="row margin-small">
                    <h1 id="share_label">{"Share Game:"}</h1>
                </div>

                <div className="row margin-extra-small">
                    <h2 id="game_id_label">{"Game ID: " + gameData.id}</h2>
                </div>

                <div className="row margin-extra-small">
                    <div id="game_id_action_buttons">
                        <button className="action_button" id="copy_button" onClick={() => navigator.clipboard.writeText(getGameUrl())}>
                            <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
                        </button>
                        <button className="action_button" id="qr_button" onClick={() => openQR()}>
                            <FontAwesomeIcon icon={faQrcode}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>

                <div className="row margin-small">
                    <h1 id="share_label">{"Show Score History:"}</h1>
                </div>

                <div className="row margin-extra-small">
                    <button className="action_button" id="show_scores_button" onClick={() => onShowScoreGraphs()}>
                        <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>
                    </button>
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

                {gameData.players.filter((player) => !player.deleted).map((player) => (
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

            {scoreGraphModalOpen && (
                <ScoreGraphModal gameData={gameData} backAction={() => { setScoreGraphModalOpen(false);}} />
            )}
        </>
    );
}

export default Game;
