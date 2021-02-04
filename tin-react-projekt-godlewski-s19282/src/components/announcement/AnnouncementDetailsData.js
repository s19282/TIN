import React from 'react';
import { useTranslation } from 'react-i18next';

function AnnouncementDetailsData(props){
    const announcement = props.announcementData
    const { t } = useTranslation()

    return (
        <React.Fragment>
            <p>{t('announcement.fields.firstName')}: {announcement.dateOfPublication}</p>
            <p>{t('announcement.fields.lastName')}: {announcement.expirationDate} </p>
            <p>{t('announcement.fields.email')}: {announcement.text} </p>
        </React.Fragment>
    )
}

export default AnnouncementDetailsData