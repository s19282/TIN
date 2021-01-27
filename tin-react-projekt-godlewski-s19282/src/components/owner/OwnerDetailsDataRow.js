function OwnerDetailsDataRow(props)
{
    const registration = props.registrationData
    return (
        <tr key={registration.id}>
            <td>{registration.vehicle.vin}</td>
            <td>{registration.dateFrom}</td>
            <td>{registration.dateTo}</td>
            <td>{registration.registrationNumber}</td>
            <td>{registration.insuranceNumber}</td>
        </tr>
    )
}

export default OwnerDetailsDataRow