import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHorseHead,
  faChurch,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

import "./how_to_play.scss";

const HowToPlay = function (props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="row margin-small">
        <h3>How To Play</h3>
      </div>

      <div className="row" style={{ textAlign: "center" }}>
        <p>
          First one to shout the correct phrase when one of the gamepieces is
          spotted gets to perform an action
        </p>
      </div>

      <div className="row tutorial-row">
        <div className="fa-icon tutorial-icon-container">
          <FontAwesomeIcon icon={faHorseHead} />
        </div>

        <div className="tutorial-description">
          <p>
            <span className="bold">Phrase: </span>My Cow!
          </p>
          <p>
            <span className="bold">What: </span>Add +1 to your score
          </p>
          <p>
            <span className="bold">When: </span>When you see a large animal
          </p>
        </div>
      </div>

      <div className="row tutorial-row">
        <div className="fa-icon tutorial-icon-container">
          <FontAwesomeIcon icon={faChurch} />
        </div>

        <div className="tutorial-description">
          <p>
            <span className="bold">Phrase: </span>Marry My Cows!
          </p>
          <p>
            <span className="bold">What: </span>Double your score
          </p>
          <p>
            <span className="bold">When: </span>When you see a church
          </p>
        </div>
      </div>

      <div className="row tutorial-row">
        <div className="fa-icon tutorial-icon-container">
          <FontAwesomeIcon icon={faSkull} />
        </div>

        <div className="tutorial-description">
          <p>
            <span className="bold">Phrase: </span>Kill Your Cows!
          </p>
          <p>
            <span className="bold">What: </span>Sets opponent's score to 0
          </p>
          <p>
            <span className="bold">When: </span>When you see a graveyard
          </p>
        </div>
      </div>

      {/* Home Button */}

      <div className="row margin-medium">
        <button className="main-menu-button" onClick={() => navigate("/")}>
          Return to Homepage
        </button>
      </div>
    </>
  );
};

export default HowToPlay;
