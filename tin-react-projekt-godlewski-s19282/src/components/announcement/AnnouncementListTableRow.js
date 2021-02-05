import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {deleteAnnouncementApiCall} from "../../apiCalls/announcementApiCalls";


function AnnouncementListTableRow(props)
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
                    <li><Link to={`/announcement/details/${announcement.id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/announcement/edit/${announcement.id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={`/announcement/delete/${announcement.id}`} className="list-actions-button-delete"
                              onClick={()=>deleteAnnouncementApiCall(announcement.id).then(()=>window.location.reload())}>{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
        </tr>
        )
}
export default AnnouncementListTableRow;