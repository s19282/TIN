import React from "react";

function RegistrationDetailsData(props) {
    const registration = props.registrationData
    return (
        <React.Fragment>
            <p>Właściciel:{registration.owner.firstName+" "+registration.owner.lastName}</p>
            <p>Pojazd: {registration.vehicle.make+" "+registration.vehicle.model}</p>
            <p>Data od: {registration.dateFrom}</p>
            <p>Data do: {registration.dateTo}</p>
            <p>Numer rejestracyjny: {registration.registrationNumber}</p>
            <p>Numer ubezpieczenia: {registration.insuranceNumber}</p>
        </React.Fragment>
    )
}

export default RegistrationDetailsData