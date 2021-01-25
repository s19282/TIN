import React from "react";
import {Link} from 'react-router-dom'
import {getRegistrationByIdApiCall, getRegistrationsApiCall} from "../../apiCalls/registrationApiCalls";

function RegistrationDetails({ match }) {
    const registrationId = parseInt(match.params.registrationId);
    const registration = getRegistrationByIdApiCall(registrationId);

    return (
        <main>
            <h2>Szczegóły rejestracji</h2>
            <p>Właściciel:{registration.owner.firstName+" "+registration.owner.lastName}</p>
            <p>Pojazd: {registration.vehicle.make+" "+registration.vehicle.model}</p>
            <p>Data od: {registration.dateFrom}</p>
            <p>Data do: {registration.dateTo}</p>
            <p>Numer rejestracyjny: {registration.registrationNumber}</p>
            <p>Numer ubezpieczenia: {registration.insuranceNumber}</p>
            <div className="section-buttons">
                <Link to="/registration" className="button-back">Powrót</Link>
            </div>
        </main>
    )
}

export default RegistrationDetails