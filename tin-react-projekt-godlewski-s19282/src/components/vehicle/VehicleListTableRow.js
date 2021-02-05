import {Link} from "react-router-dom";
import React from 'react'
import { isAuthenticated } from '../../helpers/authHelper'
import {deleteVehicleApiCall} from "../../apiCalls/vehicleApiCalls";
import { withTranslation } from 'react-i18next';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class VehicleListTableRow extends React.Component
{
    submit = (id) => {
        const { t } = this.props
        confirmAlert({
            title: t('list.actions.confirm.title'),
            message: t('list.actions.confirm.message'),
            buttons: [
                {
                    label: t('list.actions.confirm.yes'),
                    onClick: () => deleteVehicleApiCall(id).then(()=>window.location.reload())
                },
                {
                    label: t('list.actions.confirm.no'),
                    onClick: () => {}
                }
            ]
        });
    };

    render()
    {
        const vehicle = this.props.vehicleData;
        const { t } = this.props
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
                        <li><Link to={`/vehicle/delete/${vehicle.id}`} className="list-actions-button-delete"
                                  onClick={()=>this.submit(vehicle.id)}>{t('list.actions.delete')}</Link></li>
                        }
                    </ul>
                </td>
            </tr>
        )
    }
}

export default withTranslation()(VehicleListTableRow);