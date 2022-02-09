import "./game.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function PlayerCard() {
  return (
    <>
      <div className="row margin-small">
        <select className="combo-box">
          <option value="1">My Cow! (+1)</option>
          <option value="2">Marry My Cows! (x2)</option>
          <option value="3">Kill Your Cows! (=0)</option>
        </select>
      </div>
    </>
  );
}

export default PlayerCard;
