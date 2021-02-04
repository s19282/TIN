import {Link} from "react-router-dom";
import React from "react";
import { withTranslation } from 'react-i18next';
import { confirmAlert } from 'react-confirm-alert';
import {deleteRegistrationApiCall} from "../../apiCalls/registrationApiCalls";

class RegistrationListTableRow extends React.Component
{
    //todo notice after removed
    submit = (id) => {
        const { t } = this.props
        confirmAlert({
            title: t('list.actions.confirm.title'),
            message: t('list.actions.confirm.message'),
            buttons: [
                {
                    label: t('list.actions.confirm.yes'),
                    onClick: () => deleteRegistrationApiCall(id).then(()=>window.location.reload())
                },
                {
                    label: t('list.actions.confirm.no'),
                    onClick: () => {}
                }
            ]
        });
    };

    render() {
        const registration = this.props.registrationData
        const { t } = this.props

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
                                  onClick={()=>this.submit(registration.id)}>{t('list.actions.delete')}</Link></li>
                    </ul>
                </td>
            </tr>
        )
    }
}

export default withTranslation()(RegistrationListTableRow)