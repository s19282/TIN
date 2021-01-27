import React from 'react';
import OwnerDetailsDataRow from "./OwnerDetailsDataRow";

function OwnerDetailsData(props){
    const owner = props.ownerData
    return (
        <React.Fragment>
            <p>Imię: {owner.firstName}</p>
            <p>Nazwisko: {owner.lastName} </p>
            <p>E-mail: {owner.email} </p>
            <p>Numer telefonu: {owner.phoneNumber}</p>
            <h2>Auta właściciela</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>VIN</th>
                    <th>Data od</th>
                    <th>Data do</th>
                    <th>Numer rejestracyjny</th>
                    <th>Numer ubezpieczenia</th>
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