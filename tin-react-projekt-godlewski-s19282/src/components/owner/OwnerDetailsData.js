import React from 'react';
import OwnerDetailsDataRow from "./OwnerDetailsDataRow";
import { useTranslation } from 'react-i18next';

function OwnerDetailsData(props){
    const owner = props.ownerData
    const { t } = useTranslation()

    return (
        <React.Fragment>
            <p>{t('owner.fields.firstName')}: {owner.firstName}</p>
            <p>{t('owner.fields.lastName')}: {owner.lastName} </p>
            <p>{t('owner.fields.email')}: {owner.email} </p>
            <p>{t('owner.fields.phoneNumber')}: {owner.phoneNumber}</p>
            <h2>{t('owner.details.registrations')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('vehicle.fields.vin')}</th>
                    <th>{t('registration.fields.dateFrom')}</th>
                    <th>{t('registration.fields.dateTo')}</th>
                    <th>{t('registration.fields.registrationNumber')}</th>
                    <th>{t('registration.fields.insuranceNumber')}</th>
                </tr>
                </thead>
                <tbody>
                {owner.registrations.map(
                    registration =>
                        <OwnerDetailsDataRow registrationData={registration} key={registration.id}/>
                )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default OwnerDetailsData