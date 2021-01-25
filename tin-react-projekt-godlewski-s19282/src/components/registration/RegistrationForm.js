import React from "react";
import {Link} from "react-router-dom";
import {getVehiclesApiCall} from "../../apiCalls/vehicleApiCalls";
import  {getOwnersApiCall} from "../../apiCalls/ownerApiCalls";

class RegistrationForm extends React.Component{
    render() {
        const allOwners = getOwnersApiCall();
        const allVehicles = getVehiclesApiCall();

        return (
            <main>
                <h2>Nowa rejestracja</h2>
                <form className="form">
                    <label htmlFor="owner">Właściciel: <abbr title="required" aria-label="required">*</abbr> </label>
                    <select id="owner" name="ownerId" required>
                        <option value="">--- Wybierz właściciela ---</option>
                        {allOwners.map(owner =>
                            (<option key={owner.id} value={owner.id} label={owner.firstName+" "+owner.lastName}></option>)
                        )}
                    </select>
                    <span id="errorOwner" className="errors-text"></span>

                    <label htmlFor="vehicle">Pojazd: <abbr title="required" aria-label="required">*</abbr> </label>
                    <select id="vehicle" name="vehicleId" required>
                        <option value="">--- Wybierz pojazd ---</option>
                        {allVehicles.map(vehicle =>
                            (<option key={vehicle.id} value={vehicle.id} label={vehicle.make+" "+vehicle.model}></option>)
                        )}
                    </select>
                    <span id="errorVehicle" className="errors-text"></span>

                    <label htmlFor="dateFrom">Data od</label>
                    <input type="date" name="dateFrom" value=""/>
                    <span id="errorDateFrom" className="errors-text"></span>

                    <label htmlFor="dateTo">Data do</label>
                    <input type="date" name="dateTo" value=""/>
                    <span id="errorDateTo" className="errors-text"></span>

                    <label htmlFor="registrationNumber">Numer rejestracyjny</label>
                    <input type="text" name="registrationNumer" value="" placeholder="AAA 11111"/>
                    <span id="errorRegistrationNumer" className="errors-text"></span>

                    <label htmlFor="insuranceNumer">Numer ubezpieczenia</label>
                    <input type="text" name="insuranceNumer" value=""/>
                    <span id="errorInsuranceNumer" className="errors-text"></span>

                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-button-submit" type="submit" value="Dodaj" />
                        <Link to="/registration" className="form-button-cancel">Anuluj</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default RegistrationForm