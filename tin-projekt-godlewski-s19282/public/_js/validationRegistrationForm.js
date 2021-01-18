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

    let valid = true;

    if (!checkRequired(ownerInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        ownerInput.classList.add("error-input");
        errorOwner.innerText = reqMessage;
    }

    if (!checkRequired(vehicleInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        vehicleInput.classList.add("error-input");
        errorVehicle.innerText = reqMessage;
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

    if (!checkRequired(dateFromInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = reqMessage;
    }
    else if (!checkDate(dateFromInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-correctDateFormat').innerText;
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = reqMessage;
    }
    else if (checkDateIfAfter(dateFromInput.value, nowString))
    {
        const reqMessage = document.getElementById('errorMessage-notFutureDate').innerText;
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = reqMessage;
    }
    else if (checkRequired(dateToInput.value) && checkDate(dateToInput.value)
        && !checkDateIfAfter(dateToInput.value, dateFromInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-dateBefore').innerText;
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = reqMessage;
    }

    if (!checkRequired(registrationNumberInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        registrationNumberInput.classList.add("error-input");
        errorRegistrationNumber.innerText = reqMessage;
    }
    else if (!checkRegistrationNumber(registrationNumberInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-isRegistrationNumber').innerText;
        valid = false;
        registrationNumberInput.classList.add("error-input");
        errorRegistrationNumber.innerText = reqMessage;
    }

    if (!checkRequired(insuranceNumberInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        insuranceNumberInput.classList.add("error-input");
        errorInsuranceNumber.innerText = reqMessage;
    }
    else if (!checkInsuranceNumber(insuranceNumberInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-isInsuranceNumber').innerText;
        valid = false;
        insuranceNumberInput.classList.add("error-input");
        errorInsuranceNumber.innerText = reqMessage;
    }

    if (!valid)
    {
        const reqMessage = document.getElementById('errorMessage-formsErrors').innerText;
        errorsSummary.innerText = reqMessage;
    }

    return valid;
}
