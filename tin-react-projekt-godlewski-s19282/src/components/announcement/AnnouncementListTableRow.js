import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {deleteOwnerApiCall} from "../../apiCalls/ownerApiCalls";


function OwnerListTableRow(props)
{
    const announcement = props.announcementData
    const { t } = useTranslation();

    return (
        <tr>
            <td>{announcement.dateOfPublication}</td>
            <td>{announcement.expirationDate}</td>
            <td>{announcement.text}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/owner/details/${announcement.id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/owner/edit/${announcement.id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    {/*TODO: set note REMOVED*/}
                    <li><Link to={`/owner/delete/${announcement.id}`} className="list-actions-button-delete"
                              onClick={()=>deleteOwnerApiCall(announcement.id).then(()=>window.location.reload())}>{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
        </tr>
        )
}
export default OwnerListTableRow;