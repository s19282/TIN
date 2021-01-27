import React from "react";
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/owners">Właściciele</Link></li>
                <li><Link to="/registrations">Rejestracje</Link></li>
                <li><Link to="/vehicles">Pojazdy</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation