import "./game.scss";
import PlayerCard from "./playercard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Game() {
  return (
    <>
      <div className="row margin-large">
        <button className="button">Add Player</button>
      </div>
      <PlayerCard />
    </>
  );
}

export default Game;
