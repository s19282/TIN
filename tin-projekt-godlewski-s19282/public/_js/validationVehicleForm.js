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

    if (!checkRequired(vinInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        vinInput.classList.add("error-input");
        errorVin.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(vinInput.value, 5, 30))
    {
        const reqMessage = document.getElementById('errorMessage-between5and30').innerText;
        valid = false;
        vinInput.classList.add("error-input");
        errorVin.innerText = reqMessage;
    }

    if (!checkRequired(nameInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(nameInput.value, 2, 15))
    {
        const reqMessage = document.getElementById('errorMessage-between2and15').innerText;
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = reqMessage;
    }

    if (!checkRequired(modelInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(modelInput.value, 1, 20))
    {
        const reqMessage = document.getElementById('errorMessage-between1and20').innerText;
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = reqMessage;
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

    if (!checkRequired(firstRegistrationDateInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        firstRegistrationDateInput.classList.add("error-input");
        errorFirstRegistrationDate.innerText = reqMessage;
    }
    else if (checkDateIfAfter(firstRegistrationDateInput.value, nowString))
    {
        const reqMessage = document.getElementById('errorMessage-notFutureDate').innerText;
        valid = false;
        firstRegistrationDateInput.classList.add("error-input");
        errorFirstRegistrationDate.innerText = reqMessage;
    }

    if (!checkRequired(engineCapacityInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        engineCapacityInput.classList.add("error-input");
        errorEngineCapacity.innerText = reqMessage;
    }
    else if (!checkNumber(engineCapacityInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        valid = false;
        engineCapacityInput.classList.add("error-input");
        errorEngineCapacity.innerText = reqMessage;
    }

    if (!valid)
    {
        const reqMessage = document.getElementById('errorMessage-formsErrors').innerText;
        errorsSummary.innerText = reqMessage;
    }

    return valid;
}
