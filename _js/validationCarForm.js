function validateForm()
{

    const vinInput = document.getElementById('vin');
    const nameInput = document.getElementById('name');
    const modelInput = document.getElementById('model');
    const firstRegistrationDateInput = document.getElementById('firstRegistrationDate');
    const engineCapacityInput = document.getElementById('engineCapacity');

    const errorVin = document.getElementById('errorVin');
    const errorName = document.getElementById('errorName');
    const errorModel = document.getElementById('errorModel');
    const errorFirstRegistrationDate = document.getElementById('errorFirstRegistrationDate');
    const errorEngineCapacity = document.getElementById('errorEngineCapacity');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([vinInput, nameInput, modelInput,firstRegistrationDateInput, engineCapacityInput], [errorVin, errorName, errorModel, errorFirstRegistrationDate, errorEngineCapacity], errorsSummary);

    let valid = true;

    if (!checkRequired(vinInput.value)) {
        valid = false;
        vinInput.classList.add("error-input");
        errorVin.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(vinInput.value, 5, 30)) {
        valid = false;
        vinInput.classList.add("error-input");
        errorVin.innerText = "Pole powinno zawierać od 5 do 30 znaków";
    }

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 15)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 15 znaków";
    }

    if (!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(modelInput.value, 1, 20)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole powinno zawierać od 1 do 20 znaków";
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

    if (!checkRequired(firstRegistrationDateInput.value)) {
        valid = false;
        firstRegistrationDateInput.classList.add("error-input");
        errorFirstRegistrationDate.innerText = "Pole jest wymagane";
    } else if (checkDateIfAfter(firstRegistrationDateInput.value, nowString)) {
        valid = false;
        firstRegistrationDateInput.classList.add("error-input");
        errorFirstRegistrationDate.innerText = "Data nie może być z przyszłości";
    }

    if (!checkRequired(engineCapacityInput.value)) {
        valid = false;
        engineCapacityInput.classList.add("error-input");
        errorEngineCapacity.innerText = "Pole jest wymagane";
    }
    else if (!checkNumber(engineCapacityInput.value)) {
    valid = false;
    engineCapacityInput.classList.add("error-input");
    errorEngineCapacity.innerText = "Pole powinno być liczbą";
}

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}
