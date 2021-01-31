import React from "react";
import VehicleListTableRow from "./VehicleListTableRow";
import { useTranslation } from 'react-i18next';

function VehicleListTable(props)
{
    const vehicles = props.vehicleList;
    const { t } = useTranslation();

    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('vehicle.fields.vin')}</th>
                    <th>{t('vehicle.fields.make')}</th>
                    <th>{t('vehicle.fields.model')}</th>
                    <th>{t('vehicle.fields.firstRegistrationDate')}</th>
                    <th>{t('vehicle.fields.engineCapacity')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {vehicles.map(vehicle =>(
                    <VehicleListTableRow vehicleData={vehicle} key={vehicle.id}/>
                ))}
            </tbody>
        </table>
    )
}

export default VehicleListTable;