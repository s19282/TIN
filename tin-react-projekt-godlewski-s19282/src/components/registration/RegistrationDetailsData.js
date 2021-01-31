import React from "react";
import { useTranslation } from 'react-i18next';

function RegistrationDetailsData(props) {
    const registration = props.registrationData
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <p>{t('registration.fields.owner')}: {registration.owner.firstName+" "+registration.owner.lastName}</p>
            <p>{t('registration.fields.vehicle')}: {registration.vehicle.make+" "+registration.vehicle.model}</p>
            <p>{t('registration.fields.dateFrom')}: {registration.dateFrom}</p>
            <p>{t('registration.fields.dateTo')}: {registration.dateTo}</p>
            <p>{t('registration.fields.registrationNumber')}: {registration.registrationNumber}</p>
            <p>{t('registration.fields.insuranceNumber')}: {registration.insuranceNumber}</p>
        </React.Fragment>
    )
}

export default RegistrationDetailsData