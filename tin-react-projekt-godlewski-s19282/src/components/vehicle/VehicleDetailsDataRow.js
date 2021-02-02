import React from "react";
import {isAuthenticated} from "../../helpers/authHelper";

function VehicleDetailsDataRow(props)
{
    const registration = props.registrationData
    return (
        <tr key={registration.id}>
            <td>{registration.owner.firstName+" "+registration.owner.lastName}</td>
            <td>{registration.dateFrom}</td>
            <td>{registration.dateTo}</td>
            <td>{registration.registrationNumber}</td>
            {isAuthenticated() &&
                <td>{registration.insuranceNumber}</td>
            }
        </tr>
    )
}

export default VehicleDetailsDataRow