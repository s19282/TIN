import React from 'react';
import { useTranslation } from 'react-i18next';

function AnnouncementDetailsData(props){
    const announcement = props.announcementData
    const { t } = useTranslation()

    return (
        <React.Fragment>
            <p>{t('announcement.fields.dateOfPublication')}: {announcement.dateOfPublication}</p>
            <p>{t('announcement.fields.expirationDate')}: {announcement.expirationDate} </p>
            <p>{t('announcement.fields.text')}: {announcement.text} </p>
        </React.Fragment>
    )
}

export default AnnouncementDetailsData