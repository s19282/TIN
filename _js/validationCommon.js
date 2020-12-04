function resetErrors(inputs, errorTexts, errorInfo)
{
    for(let i=0; i<inputs.length; i++)
    {
        inputs[i].classList.remove("error_input");
    }
    for(let i=0; i<errorTexts.length; i++)
    {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}
function checkRequired(value)
{
    if (!value)
        return false;

    value = value.toString().trim();
    return value !== "";
}
function checkTextLengthRange(value, min, max)
{
    if (!value)
        return false;

    value = value.toString().trim();
    const length = value.length;
    if (max && length > max)
    {
        return false;
    }
    if (min && length < min)
    {
        return false;
    }
    return true;
}
function checkEmail(value)
{
    if (!value)
    {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}





