import "./game.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHorseHead,
    faChurch,
    faSkull,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";


function ActionButton(props) {
    const { icon, onClick, disabled, waiting } = props;

    return <button
        className={"button player-card-action-button" + ((disabled || waiting) ? " disabled" : "")}
        onClick={onClick}
    >
        <FontAwesomeIcon className={"fa-icon"} icon={icon} />
    </button>;
}

function PlayerCard(props) {
    const { playerAction, player, onDeleteRequest } = props;

    const [actionsDisabled, setActionsDisabled] = useState(false);

    const onPlayerAction = (name, action) => {
        setActionsDisabled(true);
        playerAction(name, action).then(({ data }) => {
            setActionsDisabled(false);
        });
    };


    return (
        <>
            <div className="margin-small row">
                <div className="" id="player_card_container">
                    {/* Name and Score */}
                    <div className="row" id="player_card_name_score">
                        <div>
                            {player.name}: {player.points}
                        </div>

                        <button
                            className="error-button"
                            id="player_card_delete_button"
                            onClick={() => onDeleteRequest(player.id)}
                        >
                            DELETE
                        </button>
                    </div>

                    {/* My Cow Buttons */}
                    <div className="row margin-small">
                        <ActionButton disabled={false} waiting={actionsDisabled} icon={faHorseHead} onClick={() => onPlayerAction(player.id, "cow")} />
                        <ActionButton disabled={player.points > 1 ? "" : " disabled"} waiting={actionsDisabled} icon={faChurch} onClick={() => onPlayerAction(player.id, "church")} />
                        <ActionButton disabled={false} waiting={actionsDisabled} icon={faSkull} onClick={() => onPlayerAction(player.id, "graveyard")} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlayerCard;
