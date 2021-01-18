function validateForm()
{
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phoneNumber');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorPhoneNumber = document.getElementById('errorPhoneNumber');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([firstNameInput, lastNameInput, emailInput, phoneNumberInput], [errorFirstName, errorLastName, errorEmail, errorPhoneNumber], errorsSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(firstNameInput.value, 2, 60))
    {
        const reqMessage = document.getElementById('errorMessage-between2and60').innerText;
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    }

    if (!checkRequired(lastNameInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(lastNameInput.value, 2, 60))
    {
        const reqMessage = document.getElementById('errorMessage-between2and60').innerText;
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessage;
    }

    if (!checkRequired(phoneNumberInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(phoneNumberInput.value, 7, 12))
    {
        const reqMessage = document.getElementById('errorMessage-between7and60').innerText;
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = reqMessage;
    }
    else if (!checkNumber(phoneNumberInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = reqMessage;
    }
    if (checkRequired(emailInput.value) && !checkEmail(emailInput.value))
    {
        const reqMessage = document.getElementById('errorMessage-email').innerText;
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    }
    if (!valid)
    {
        errorsSummary.innerText = document.getElementById('errorMessage-formsErrors').innerText;
    }

    return valid;
}
