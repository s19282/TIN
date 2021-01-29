function resetErrors(inputs, errorTexts, errorInfo)
{
    for(let i=0; i<inputs.length; i++)
    {
        inputs[i].classList.remove("error-input");
    }
    for(let i=0; i<errorTexts.length; i++)
    {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}
export function checkRequired(value)
{
    if (!value)
        return false;

    value = value.toString().trim();
    return value !== "";
}
export function checkTextLengthRange(value, min, max)
{
    if (!value)
        return false;

    value = value.toString().trim();
    const length = value.length;
    if (max && length > max)
    {
        return false;
    }
    return !(min && length < min);

}
export function checkEmail(value)
{
    if (!value)
    {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return re.test(value);
}
function checkInsuranceNumber(value)
{
    return checkTextLengthRange(value,9,9);
}

function checkRegistrationNumber(value)
{
    if (!value)
    {
        return false;
    }
    value = value.toString().trim();
    const re = /^([A-Z]{2,3}) (\d{4,5})$/i;

    return re.test(value);
}

function checkNumber(value)
{
    if (!value)
    {
        return false;
    }
    return !isNaN(value);

}

function checkDate(value)
{
    if (!value)
    {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}
function checkDateIfAfter(value, compareTo)
{
    if (!value)
    {
        return false;
    }
    if (!compareTo)
    {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;

    if (!pattern.test(value))
    {
        return false;
    }
    if (!pattern.test(compareTo))
    {
        return false;
    }
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);

    return valueDate.getTime() >= compareToDate.getTime();
}







