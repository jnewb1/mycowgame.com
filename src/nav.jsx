import "./nav.scss";

import CowLogo from '/media/cow-svgrepo-com.svg?react';
import { useNavigate } from "react-router-dom";

function Nav() {
    const navigate = useNavigate();

    return (
        <>
            <div
                id="navbar"
                className="margin-small"
                onClick={() => {
                    navigate("/");
                }}
            >
                <div className="row">
                    <h1 id="navbar_text">MY COW</h1>
                </div>
            </div>
            <div className="row margin-extra-small">
                <CowLogo id="cow_logo" />
            </div>
        </>
    );
}

export default Nav;
