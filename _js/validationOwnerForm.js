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
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(phoneNumberInput.value)) {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(phoneNumberInput.value, 7, 12)) {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    } else if (!checkNumber(phoneNumberInput.value)) {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole powinno być liczbą";
    }
    if (checkRequired(emailInput.value) && !checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}
