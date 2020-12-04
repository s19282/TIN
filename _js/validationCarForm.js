function checkRequired(value) {
    return false;
}

function checkTextLengthRange(value, number, number2) {
    return false;
}
function checkDate(date)
{
    return false;
}


function resetErrors(htmlElements, htmlElements2, errorsSummary) {
    
}

function checkEmail(value) {
    return false;
}

function validateForm()
{
    const VINInput = document.getElementById('VIN');
    const nameInput = document.getElementById('name');
    const modelInput = document.getElementById('model');
    const firstRegistrationDateInput = document.getElementById('firstRegistrationDate');
    const engineCapacityInput = document.getElementById('engineCapacity');

    const errorVIN = document.getElementById('errorVIN');
    const errorName = document.getElementById('errorName');
    const errorModel = document.getElementById('errorModel');
    const errorFirstRegistrationDate = document.getElementById('errorFirstRegistrationDate');
    const errorEngineCapacity = document.getElementById('errorEngineCapacity');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([VINInput, nameInput, modelInput, engineCapacityInput], [errorVIN, errorName, errorModel, errorEngineCapacity], errorsSummary);

    let valid = true;

    if (!checkRequired(VINInput.value)) {
        valid = false;
        VINInput.classList.add("error-input");
        errorVIN.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(VINInput.value, 5, 30)) {
        valid = false;
        VINInput.classList.add("error-input");
        errorVIN.innerText = "Pole powinno zawierać od 5 do 30 znaków";
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

    if (!checkRequired(firstRegistrationDateInput.value))
    {
        valid = false;
        firstRegistrationDateInput.classList.add("error-input");
        errorFirstRegistrationDate.innerText = "Data nie może być z przyszłości";
    }

    if (!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(modelInput.value, 1, 20)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole powinno zawierać od 1 do 20 znaków";
    }

    if (!checkRequired(engineCapacityInput.value)) {
        valid = false;
        engineCapacityInput.classList.add("error-input");
        errorEngineCapacity.innerText = "Pojemność silnika musi być większa od zera.";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}
