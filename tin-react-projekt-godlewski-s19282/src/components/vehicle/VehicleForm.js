import React from "react";
import {Link} from "react-router-dom";

class VehicleForm extends React.Component{
    render() {
        return (
            <main>
                <h2>Nowy pojazd</h2>
                <form className="form">
                    <label htmlFor="vin">VIN: <abbr title="required" aria-label="required">*</abbr> </label>
                    <input type="text" name="vin" id="vin" placeholder="5-30 znaków" value=""/>
                    <span id="errorVin" className="errors-text"></span>
                    {/*TODO: change placeholders*/}
                    <label htmlFor="make">Marka: <abbr title="required" aria-label="required">*</abbr> </label>
                    <input type="text" name="make" id="make" placeholder="1-30 znaków" value=""/>
                    <span id="errorMake" className="errors-text"></span>

                    <label htmlFor="model">Model: <abbr title="required" aria-label="required">*</abbr> </label>
                    <input type="text" name="model" id="model" placeholder="5-30 znaków" value=""/>
                    <span id="errorModel" className="errors-text"></span>

                    <label htmlFor="firstRegistrationDate">Data pierwszej rejestracji: <abbr title="required" aria-label="required">*</abbr> </label>
                    <input type="date" name="firstRegistrationDate" id="firstRegistrationDate" placeholder="5-30 znaków" value=""/>
                    <span id="errorFirstRegistrationDate" className="errors-text"></span>

                    <label htmlFor="engineCapacity">Pojemność silnika: <abbr title="required" aria-label="required">*</abbr> </label>
                    <input type="text" name="engineCapacity" id="engineCapacity" placeholder="5-30 znaków" value=""/>
                    <span id="errorEngineCapacity" className="errors-text"></span>
                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-button-submit" type="submit" value="Dodaj" />
                        <Link to="/vehicles" className="form-button-cancel">Anuluj</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default VehicleForm