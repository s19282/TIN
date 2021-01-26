import React from "react";
import {Link} from 'react-router-dom'
import {getRegistrationsApiCall} from "../../apiCalls/registrationApiCalls";

function RegistrationList()
{
    const  registrationList = getRegistrationsApiCall();
    return(
        <main>
            <h2>Lista rejestracji</h2>
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
                {registrationList.map(registration =>(
                    <tr key={registration.id}>
                        <td>{registration.owner.firstName+" "+registration.owner.lastName}</td>
                        <td>{registration.vehicle.make+" "+registration.vehicle.model}</td>
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
                ))}
                </tbody>
            </table>
            <p className="section-buttons">
                <Link to="/registration/add" className="button-add">Dodaj nową rejestrację</Link>
            </p>
        </main>
    )
}

export default RegistrationList