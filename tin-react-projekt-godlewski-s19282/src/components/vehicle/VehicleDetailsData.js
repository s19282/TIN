import React from "react";
import VehicleDetailsDataRow from "./VehicleDetailsDataRow";
import { useTranslation } from 'react-i18next';
import {isAuthenticated} from "../../helpers/authHelper";

function VehicleDetailsData(props)
{
    const vehicle = props.vehicleData
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <p>{t('vehicle.fields.vin')}: {vehicle.vin}</p>
            <p>{t('vehicle.fields.make')}: {vehicle.make}</p>
            <p>{t('vehicle.fields.model')}: {vehicle.model}</p>
            <p>{t('vehicle.fields.firstRegistrationDate')}: {vehicle.firstRegistrationDate}</p>
            <p>{t('vehicle.fields.engineCapacity')}: {vehicle.firstRegistrationDate}</p>
            <h2>{t('vehicle.details.ownersOfVehicle')}</h2>

            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('registration.fields.owner')}</th>
                    <th>{t('registration.fields.dateFrom')}</th>
                    <th>{t('registration.fields.dateTo')}</th>
                    <th>{t('registration.fields.registrationNumber')}</th>
                    {isAuthenticated() &&
                        <th>{t('registration.fields.insuranceNumber')}</th>
                    }
                </tr>
                </thead>
                <tbody>
                {vehicle.registrations.map(
                    registration =>
                        <VehicleDetailsDataRow registrationData={registration} key={registration.id}/>
                        )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default VehicleDetailsData