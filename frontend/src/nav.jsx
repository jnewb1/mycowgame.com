import "./nav.scss";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  return (
    <>
      <div
        id="navbar"
        className="row margin-small"
        onClick={() => {
          navigate("/");
        }}
      >
        <h1>MY COW</h1>
      </div>
    </>
  );
}

export default Nav;
