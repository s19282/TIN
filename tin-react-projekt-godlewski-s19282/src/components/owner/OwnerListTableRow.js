import {Link} from "react-router-dom";

function OwnerListTableRow(props)
{
    const owner = props.ownerData
    return (
        <tr>
            <td>{owner.firstName}</td>
            <td>{owner.lastName}</td>
            <td>{owner.email}</td>
            <td>{owner.phoneNumber}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`owners/details/${owner.id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`owners/edit/${owner.id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`owners/delete/${owner.id}`} className="list-actions-button-delete">Usuń</Link>
                    </li>
                </ul>
            </td>
        </tr>
        )
}
export default OwnerListTableRow;