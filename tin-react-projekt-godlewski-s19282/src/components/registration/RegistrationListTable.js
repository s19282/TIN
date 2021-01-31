import React from "react";
import RegistrationListTableRow from "./RegistrationListTableRow";
import { useTranslation } from 'react-i18next';

function RegistrationListTable(props)
{
    const registrations = props.registrationsList
    const { t } = useTranslation();

    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('registration.fields.owner')}</th>
                <th>{t('registration.fields.vehicle')}</th>
                <th>{t('registration.fields.dateFrom')}</th>
                <th>{t('registration.fields.dateTo')}</th>
                <th>{t('registration.fields.registrationNumber')}</th>
                <th>{t('registration.fields.insuranceNumber')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
                {registrations.map(registration =>(
                    <RegistrationListTableRow registrationData={registration} key={registration.id}/>
                ))}
            </tbody>
        </table>
    )
}

export default RegistrationListTable