import {Link} from "react-router-dom";
import React from 'react'
import {deleteOwnerApiCall} from "../../apiCalls/ownerApiCalls";
import { withTranslation } from 'react-i18next';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class OwnerListTableRow extends React.Component
{
    submit = (id) => {
        const { t } = this.props
        confirmAlert({
            title: t('list.actions.confirm.title'),
            message: t('list.actions.confirm.message'),
            buttons: [
                {
                    label: t('list.actions.confirm.yes'),
                    onClick: () => deleteOwnerApiCall(id).then(()=>window.location.reload())
                },
                {
                    label: t('list.actions.confirm.no'),
                    onClick: () => {}
                }
            ]
        });
    };

    render() {
        const owner = this.props.ownerData
        const { t } = this.props

        return (
            <tr>
                <td>{owner.firstName}</td>
                <td>{owner.lastName}</td>
                <td>{owner.email}</td>
                <td>{owner.phoneNumber}</td>
                <td>
                    <ul className="list-actions">
                        <li><Link to={`/owner/details/${owner.id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        <li><Link to={`/owner/edit/${owner.id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        {/*TODO: set note REMOVED*/}
                        {/*TODO: block removing logged user*/}
                        <li><Link to={`/owner/delete/${owner.id}`} className="list-actions-button-delete"
                                  onClick={() => this.submit(owner.id)} >{t('list.actions.delete')}</Link></li>
                    </ul>
                </td>
            </tr>
        )
    }

}
export default withTranslation()(OwnerListTableRow);