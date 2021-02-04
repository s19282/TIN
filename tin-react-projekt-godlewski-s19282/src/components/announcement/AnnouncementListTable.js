import React from "react";
import AnnouncementListTableRow from "./AnnouncementListTableRow";
import { useTranslation } from 'react-i18next';

function AnnouncementListTable(props)
{
    const announcements = props.announcementList;
    const { t } = useTranslation();

    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('announcement.fields.dateOfPublication')}</th>
                    <th>{t('announcement.fields.expirationDate')}</th>
                    <th>{t('announcement.fields.text')}</th>
                    <th>{t('list.actions.title')}</th>

                </tr>
            </thead>
            <tbody>
            {announcements.map(announcement =>
                <AnnouncementListTableRow announcementData={announcement} key={announcement.id}/>
            )}
            </tbody>
        </table>
    )
}
export default AnnouncementListTable