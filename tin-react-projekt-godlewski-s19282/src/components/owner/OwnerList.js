import React from "react";
import {Link} from "react-router-dom";
import {getOwnersApiCall} from "../../apiCalls/ownerApiCalls";

function OwnerList(){
    const ownerList = getOwnersApiCall();
    return (
        <main>
            <h2>Lista właścicieli</h2>
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
                    {ownerList.map(owner => (
                      <tr key={owner.id}>
                          <td>{owner.firstName}</td>
                          <td>{owner.lastName}</td>
                          <td>{owner.email}</td>
                          <td>{owner.phoneNumber}</td>
                          <td>
                              <ul className="list-actions">
                                  <li><Link to={`owners/details/${owner.id}`} className="list-actions-button-details">Szczegóły</Link></li>
                                  <li><Link to={`owners/edit/${owner.id}`} className="list-actions-button-edit">Edytuj</Link></li>
                                  <li><Link to={`owners/delete/${owner.id}`} className="list-actions-button-delete">Usuń</Link></li>
                              </ul>
                          </td>
                      </tr>
                    ))}
                </tbody>
            </table>
            <p className="section-buttons">
                <Link href="/owners/add" className="button-add">Dodaj nowego pracownika</Link>
            </p>
        </main>
    );
}

export default OwnerList;