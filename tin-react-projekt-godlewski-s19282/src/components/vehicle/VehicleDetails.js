import React from "react";
import {Link, useParams} from 'react-router-dom'
import {getVehicleByIdApiCall} from "../../apiCalls/vehicleApiCalls";

function VehicleDetails(){
    let {vehicleId} = useParams();
    const vehicle = getVehicleByIdApiCall(vehicleId);
    return (
        <main>
            <h2>Szczegóły pojazdu</h2>
            <p>VIN: {vehicle.vin}</p>
            <p>Marka: {vehicle.make}</p>
            <p>Model: {vehicle.model}</p>
            <p>Data pierwszej rejestracji: {vehicle.firstRegistrationDate}</p>
            <p>Pojemność silnika: {vehicle.firstRegistrationDate}</p>
            <h2>Szczegóły rejestracji</h2>
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
                {vehicle.registrations.map(
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
                <Link to="/vehicles" className="button-back">Powrót</Link>
            </div>
        </main>
    );
}

export default VehicleDetails