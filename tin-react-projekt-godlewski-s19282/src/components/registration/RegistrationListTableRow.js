import {Link} from "react-router-dom";
import React from "react";
import { useTranslation } from 'react-i18next';
import {deleteRegistrationApiCall} from "../../apiCalls/registrationApiCalls";

function RegistrationListTableRow(props)
{
    const registration = props.registrationData
    const { t } = useTranslation();

    return (
        <tr key={registration.id}>
            <td>{registration.owner.firstName+" "+registration.owner.lastName}</td>
            <td>{registration.vehicle.make+" "+registration.vehicle.model}</td>
            <td>{registration.dateFrom}</td>
            <td>{registration.dateTo}</td>
            <td>{registration.registrationNumber}</td>
            <td>{registration.insuranceNumber}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/registration/details/${registration.id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/registration/edit/${registration.id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={`/registration/delete/${registration.id}`} className="list-actions-button-delete"
                              onClick={()=>deleteRegistrationApiCall(registration.id).then(()=>window.location.reload())}>{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default RegistrationListTableRow