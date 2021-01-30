import {Link} from "react-router-dom";

function VehicleListTableRow(props)
{
    const vehicle = props.vehicleData;
    return (
        <tr key={vehicle.id}>
            <td>{vehicle.vin}</td>
            <td>{vehicle.make}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.firstRegistrationDate}</td>
            <td>{vehicle.engineCapacity}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/vehicle/details/${vehicle.id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/vehicle/edit/${vehicle.id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`/vehicle/delete/${vehicle.id}`} className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default VehicleListTableRow;