import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculatePoints } from "../api"
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
    const { gameData } = props;

    // const data = [
    //     { a: 400, b: 0, c: 2400 },
    //     { a: 300,},
    //     { a: 200, b: 100},
    //     { b: 100},
    //     { a: 300, b: 200, c: 2210 },
    // ];
    //    const indexedData = data.map((item, index) => ({ ...item, index }));

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

    
    const log2TickFormatter = (value) => `2^${Math.log2(value)}`;
    return (
        <div className="modal">
            <div className="row margin-small">
                <div id="score_chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{left: 20, right: 20, top: 20, bottom: 20}}>
                            <CartesianGrid strokeDasharray="5 5" />
                            <XAxis dataKey="index" tick={{ fontSize: 40 }}/>
                            <YAxis tick={{ fontSize: 40 }}/>
                            {gameData.players.map((player) => (
                                <Line type="monotone" key={player.name} dataKey={player.name} stroke="#ff88d8" strokeWidth="8" />
                            ))}
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: 14 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export { ConfirmationModal, AlertModal, QRModal, ScoreGraphModal };
