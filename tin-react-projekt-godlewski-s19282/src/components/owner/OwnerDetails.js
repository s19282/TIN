import React from "react";
import {Link, useParams} from "react-router-dom";
import {getOwnerByIdApiCall} from "../../apiCalls/ownerApiCalls";


function OwnerDetails(){
    let {ownerId} = useParams();
    ownerId = parseInt(ownerId);
    const owner = getOwnerByIdApiCall(ownerId);

    return (
        <main>
            <h2>Szczegóły pracownika</h2>
            <p>Imię: {owner.firstName}</p>
            <p>Nazwisko: {owner.lastName} </p>
            <p>E-mail: {owner.email} </p>
            <p>Numer telefonu: {owner.phoneNumber}</p>
            <h2>Szczegóły zatrudnienia</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>Rejestracja</th>
                        <th>Data od</th>
                        <th>Data do</th>
                        <th>Numer rejestracyjny</th>
                        <th>Numer ubezpieczenia</th>
                    </tr>
                </thead>
                <tbody>
                    {owner.registrations.map(
                        registration =>
                            <tr key={registration.id}>
                                <td>{registration.dateFrom}</td>
                                <td>{registration.dateTo}</td>
                                <td>{registration.registrationNumber}</td>
                                <td>{registration.insuranceNumber}</td>
                            </tr>
                    )}
                </tbody>
            </table>
            <div className="section-buttons">
                <Link to="/owners" className="button-back">Powrót</Link>
            </div>
        </main>
    );
}

export default OwnerDetails