import React from "react";

function VehicleDetailsDataRow(props)
{
    const registration = props.registrationData
    return (
        <tr key={registration.id}>
            <td>{registration.owner.firstName+" "+registration.owner.lastName}</td>
            <td>{registration.dateFrom}</td>
            <td>{registration.dateTo}</td>
            <td>{registration.registrationNumber}</td>
            <td>{registration.insuranceNumber}</td>
        </tr>
    )
}

export default VehicleDetailsDataRow