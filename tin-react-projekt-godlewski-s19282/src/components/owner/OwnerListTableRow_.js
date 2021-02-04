import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {deleteOwnerApiCall} from "../../apiCalls/ownerApiCalls";


function OwnerListTableRow(props)
{
    const owner = props.ownerData
    const { t } = useTranslation();

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
                              onClick={()=>deleteOwnerApiCall(owner.id).then(()=>window.location.reload())}>{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
        </tr>
        )
}
export default OwnerListTableRow;