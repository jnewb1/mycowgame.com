import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculatePoints } from "../api"
import distinctColors from "distinct-colors";

import "./modals.scss";

const QRModal = function (props) {
    const { cancelAction, confirmAction } = props;

    return (
        <div className="modal">
            <div className="row margin-small">
                <h1>Scan to join!</h1>
            </div>
            <div className="row margin-small">
                <canvas id="qrcode" className="model-image">
                </canvas>
            </div>

            <div className="row margin-small">
                <button className="button modal-button" onClick={confirmAction}>
                    Confirm
                </button>
            </div>
            <div className="row margin-small"></div>
        </div>
    );
};

const ConfirmationModal = function (props) {
    const { prompt, cancelAction, confirmAction } = props;
    return (
        <div className="modal">
            <div className="row margin-small">
                <h3>{props.prompt}</h3>
            </div>
            <div className="row margin-small">
                <button className="button modal-button" onClick={cancelAction}>
                    Cancel
                </button>
            </div>

            <div className="row margin-small">
                <button className="error-button modal-button" onClick={confirmAction}>
                    Confirm
                </button>
            </div>
            <div className="row margin-small"></div>
        </div>
    );
};

const AlertModal = function (props) {
    const { prompt, confirmAction } = props;

    return (
        <div className="modal">
            <div className="row margin-small">
                <h3>{props.prompt}</h3>
            </div>

            <div className="row margin-small">
                <button className="error-button modal-button" onClick={confirmAction}>
                    Confirm
                </button>
            </div>
            <div className="row margin-small"></div>
        </div>
    );
};


const ScoreGraphModal = function (props) {
    const { gameData, backAction } = props;
    //aufmw 
    let data = []

    const getGameDataSubset = (index) => {
        let subset = {};
        subset.players = [...gameData.players];
        subset.actions = gameData.actions.slice(0, index + 1);
        return subset;
    }

    gameData.actions.forEach((_, i) => {
        let subsetGameData = getGameDataSubset(i);
        calculatePoints(subsetGameData);

        data.push({ "index": i });
        subsetGameData.players.forEach((player) => {
            data[i][player.name] = player.points
        })
    });

    const palette = distinctColors({
        count: gameData.players.length,
        hueMin: 0,           // Minimum hue
        hueMax: 360,         // Maximum hue
        chromaMin: 50,       // Minimum chroma (vividness)
        chromaMax: 80,       // Maximum chroma (vividness)
        lightMin: 50,        // Minimum lightness
        lightMax: 80,        // Maximum lightness
    });
    const playerColors = palette.map(color => color.hex());

    return (
        <div className="modal">
            <div className="row margin-small">
                <div id="score_chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="5 5" />
                            <XAxis dataKey="index" tick={{ fontSize: 40 }} />
                            <YAxis tick={{ fontSize: 40 }} />
                            {gameData.players.map((player, i) => (
                                <Line type="monotone" key={player.name} dataKey={player.name} stroke={playerColors[i]} strokeWidth="8" />
                            ))}
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: 14 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="row margin-small">
                <button className="button modal-button" onClick={backAction}>
                    Confirm
                </button>
            </div>

            <div className="margin-small"/>
        </div>
    );
};

export { ConfirmationModal, AlertModal, QRModal, ScoreGraphModal };
