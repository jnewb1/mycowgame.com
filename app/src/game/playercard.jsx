import "./game.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHorseHead,
  faChurch,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";

import { addPlayer, removePlayer, playerAction, useGame } from "../api";

function PlayerCard(props) {
  const { gameData, player, forceUpdate } = props;

  const onRemovePlayer = (name) => {
    removePlayer(gameData.pk, name).then(({ data }) => {
      forceUpdate();
    });
  };

  const onPlayerAction = (name, action) => {
    playerAction(gameData.pk, name, action).then(({ data }) => {
      forceUpdate();
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
              onClick={() => onRemovePlayer(player.name)}
            >
              DELETE
            </button>
          </div>

          {/* My Cow Buttons */}
          <div className="row margin-small">
            <button
              className="button player-card-action-button"
              onClick={() => onPlayerAction(player.name, "My Cow")}
            >
              <FontAwesomeIcon className="fa-icon" icon={faHorseHead} />
            </button>
            <button
              className={
                "button player-card-action-button" +
                (player.points > 1 ? "" : " disabled")
              }
              onClick={() => onPlayerAction(player.name, "Marry My Cows")}
            >
              <FontAwesomeIcon className="fa-icon" icon={faChurch} />
            </button>
            <button
              className={
                "button player-card-action-button" +
                (player.points > 0 ? "" : " disabled")
              }
              onClick={() => onPlayerAction(player.name, "Kill Your Cows")}
            >
              <FontAwesomeIcon className="fa-icon" icon={faSkull} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerCard;
