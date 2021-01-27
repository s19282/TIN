import {Link} from "react-router-dom";
import React from "react";

function RegistrationListTableRow(props)
{
    const registration = props.registrationData
    return (
        <tr key={registration.id}>
            {/*TODO: change to full information*/}
            <td>{registration.owner_id}</td>
            <td>{registration.vehicle_id}</td>
            <td>{registration.dateFrom}</td>
            <td>{registration.dateTo}</td>
            <td>{registration.registrationNumber}</td>
            <td>{registration.insuranceNumber}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`registration/details/${registration.id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`registration/edit/${registration.id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`registration/delete/${registration.id}`} className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default RegistrationListTableRow