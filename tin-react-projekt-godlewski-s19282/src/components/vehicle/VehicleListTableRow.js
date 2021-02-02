import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper'

function VehicleListTableRow(props)
{
    const vehicle = props.vehicleData;
    const { t } = useTranslation();

    return (
        <tr key={vehicle.id}>
            <td>{vehicle.vin}</td>
            <td>{vehicle.make}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.firstRegistrationDate}</td>
            <td>{vehicle.engineCapacity}</td>
                <td>
                    <ul className="list-actions">
                        <li><Link to={`/vehicle/details/${vehicle.id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        {isAuthenticated() &&
                            <li><Link to={`/vehicle/edit/${vehicle.id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        }
                        {isAuthenticated() &&
                            <li><Link to={`/vehicle/delete/${vehicle.id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                        }
                    </ul>
                </td>
        </tr>
    )
}

export default VehicleListTableRow;