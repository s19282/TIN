import React from "react";
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link href="/">Strona główna</Link></li>
                <li><Link href="/owners">Właściciele</Link></li>
                <li><Link href="/registrations">Rejestracje</Link></li>
                <li><Link href="/vehicles">Pojazdy</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation