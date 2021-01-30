import React from "react";
import VehicleDetailsDataRow from "./VehicleDetailsDataRow";

function VehicleDetailsData(props)
{
    const vehicle = props.vehicleData
    return (
        <React.Fragment>
            <p>VIN: {vehicle.vin}</p>
            <p>Marka: {vehicle.make}</p>
            <p>Model: {vehicle.model}</p>
            <p>Data pierwszej rejestracji: {vehicle.firstRegistrationDate}</p>
            <p>Pojemność silnika: {vehicle.firstRegistrationDate}</p>
            <h2>Szczegóły rejestracji</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Właściciel</th>
                    <th>Data od</th>
                    <th>Data do</th>
                    <th>Numer rejestracyjny</th>
                    <th>Numer ubezpieczenia</th>
                </tr>
                </thead>
                <tbody>
                {vehicle.registrations.map(
                    registration =>
                        <VehicleDetailsDataRow registrationData={registration} key={registration.id}/>
                        )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default VehicleDetailsData