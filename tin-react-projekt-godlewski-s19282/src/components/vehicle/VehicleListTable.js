import React from "react";
import VehicleListTableRow from "./VehicleListTableRow";

function VehicleListTable(props)
{
    const vehicles = props.vehicleList;
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Data pierwszej rejestracji</th>
                    <th>Pojemność silnika</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {vehicles.map(vehicle =>(
                    <VehicleListTableRow vehicleData={vehicle} key={vehicle.id}/>
                ))}
            </tbody>
        </table>
    )
}

export default VehicleListTable;