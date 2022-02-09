import { useNavigate } from "react-router-dom";
import { createGame } from "../api";

function Homepage() {
    const navigate = useNavigate();

    const createNewGame = () => {
        createGame().then(({ data }) => {
            navigate(`/game/${data.pk}`)
        })
    }

    return (
        <>
            <div className="row margin-large">
                <button className="button" onClick={createNewGame}>Create New Game</button>
            </div>

            <div className="row margin-medium">
                <button className="button">Join Existing Game</button>
            </div>

            <div className="row margin-medium">
                <button className="button">How To Play</button>
            </div>


        </>
    );
}

export default Homepage;