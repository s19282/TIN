function validateForm()
{
    const ownerInput = document.getElementById('owner');
    const vehicleInput = document.getElementById('vehicle');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');
    const registrationNumberInput = document.getElementById('registrationNumber');
    const insuranceNumberInput = document.getElementById('insuranceNumber');

    const errorOwner = document.getElementById('errorOwner');
    const errorVehicle = document.getElementById('errorVehicle');
    const errorDateFrom = document.getElementById('errorDateFrom');
    const errorDateTo = document.getElementById('errorsDateTo');
    const errorRegistrationNumber = document.getElementById('errorRegistrationNumber');
    const errorInsuranceNumber = document.getElementById('errorInsuranceNumber');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([ownerInput, vehicleInput, dateFromInput,dateToInput, registrationNumberInput, insuranceNumberInput], [errorOwner, errorVehicle, errorDateFrom,errorDateTo, errorRegistrationNumber,errorInsuranceNumber], errorsSummary);

    // let sel = document.getElementsByTagName('select');
    // for(let i=0; i<sel.length; i++)
    //     sel[i].classList.remove('error_input');

    let valid = true;

    if (!checkRequired(ownerInput.value))
    {
        valid = false;
        ownerInput.classList.add("error-input");
        errorOwner.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(vehicleInput.value)) {
        valid = false;
        vehicleInput.classList.add("error-input");
        errorVehicle.innerText = "Pole jest wymagane";
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dateFromInput.value, nowString)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Data nie może być z przyszłości";
    } else if (checkRequired(dateToInput.value) && checkDate(dateToInput.value)
        && !checkDateIfAfter(dateToInput.value, dateFromInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Data do powinna być późniejsza niż data od";
    }


    if (!checkRequired(registrationNumberInput.value)) {
        valid = false;
        registrationNumberInput.classList.add("error-input");
        errorRegistrationNumber.innerText = "Pole jest wymagane";
    }
    else if (!checkRegistrationNumber(registrationNumberInput.value))
    {
        valid = false;
        registrationNumberInput.classList.add("error-input");
        errorRegistrationNumber.innerText = "Pole powinno zawierać prawidłowy numer rejestracyjny";
    }

    if (!checkRequired(insuranceNumberInput.value)) {
        valid = false;
        insuranceNumberInput.classList.add("error-input");
        errorInsuranceNumber.innerText = "Pole jest wymagane";
    }
    else if (!checkInsuranceNumber(insuranceNumberInput.value))
    {
        valid = false;
        insuranceNumberInput.classList.add("error-input");
        errorInsuranceNumber.innerText = "Pole powinno zawierać prawidłowy numer ubezpieczenia";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}
