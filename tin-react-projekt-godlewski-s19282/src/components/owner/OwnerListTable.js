import React from "react";
import OwnerListTableRow from "./OwnerListTableRow";

function OwnerListTable(props)
{
    const owners = props.ownerList;
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Email</th>
                <th>Numer telefonu</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {owners.map(owner =>
                <OwnerListTableRow ownerData={owner} key={owner.id}/>
            )}
            </tbody>
        </table>
    )
}
export default OwnerListTable