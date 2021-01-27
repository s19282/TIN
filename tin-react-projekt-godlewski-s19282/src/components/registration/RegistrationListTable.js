import React from "react";
import RegistrationListTableRow from "./RegistrationListTableRow";

function RegistrationListTable(props)
{
    const registrations = props.registrationsList
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Właściciel</th>
                <th>Pojazd</th>
                <th>Data od</th>
                <th>Data do</th>
                <th>Numer rejestracyjny</th>
                <th>Numer ubezpieczenia</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
                {registrations.map(registration =>(
                    <RegistrationListTableRow registrationData={registration} key={registration.id}/>
                ))}
            </tbody>
        </table>
    )
}

export default RegistrationListTable