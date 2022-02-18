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
      {/* <div className="row margin-large">
        <p id="tutorial_intro_text">
          Welcome to MyCows! Whether you're riding through the city or the
          countryside, MyCows is the best way to pass the time with your
          friends.
        </p>
      </div> */}

      <div className="row margin-large tutorial-row">
        <div className="fa-icon tutorial-icon-container">
          <FontAwesomeIcon icon={faHorseHead} />
        </div>

        <div className="tutorial-description">
          <p>
            <span className="bold">What: </span>Adds +1 cows to your total
          </p>
          <p>
            <span className="bold">When: </span>When you see a large animal
            (think: larger than a German Sheopard)
          </p>
        </div>
      </div>

      <div className="row margin-large">
        <button className="main-menu-button" onClick={() => navigate("/")}>
          Return to Homepage
        </button>
      </div>
    </>
  );
};

export default HowToPlay;
