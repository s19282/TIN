import React from "react";
import {Link} from "react-router-dom";
import {getVehiclesApiCall} from "../../apiCalls/vehicleApiCalls";

function VehicleList(){
    const vehicleList = getVehiclesApiCall();
    return (
        <main>
            <h2>Lista pojazdów</h2>
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
                {vehicleList.map(vehicle =>(
                    <tr key={vehicle.id}>
                        <td>{vehicle.vin}</td>
                        <td>{vehicle.make}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.firstRegistrationDate}</td>
                        <td>{vehicle.engineCapacity}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`vehicle/details/${vehicle.id}`} className="list-actions-button-details">Szczegóły</Link></li>
                                <li><Link to={`vehicle/edit/${vehicle.id}`} className="list-actions-button-edit">Edytuj</Link></li>
                                <li><Link to={`vehicle/delete/${vehicle.id}`} className="list-actions-button-delete">Usuń</Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="section-buttons">
                <Link href="/vehicle/add" className="button-add">Dodaj nowego pracownika</Link>
            </p>
        </main>
    )
}

export default VehicleList;