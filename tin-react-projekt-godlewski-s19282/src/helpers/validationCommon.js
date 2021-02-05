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

}export function checkTextLength(value)
{
    return value.length;
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
export function checkInsuranceNumber(value)
{
    return checkTextLengthRange(value,9,9);
}

export function checkRegistrationNumber(value)
{
    if (!value)
    {
        return false;
    }
    value = value.toString().trim();
    const re = /^([A-Z]{2,3}) (\d{4,5})$/i;

    return re.test(value);
}

export function checkNumber(value)
{
    if (!value)
        return false;
    return isNaN(value);

}

export function checkDate(value)
{
    if (!value)
        return false;
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}
export function checkDateIfAfter(value, compareTo)
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

export function isSameOrBefore(reqDate){
    const today = new Date();
    const date = new Date(reqDate);
    return date>today
}

// export function isSameOrAfter(reqDate)
// {
//     const date = new Date(reqDate);
//     const dateFrom = new Date(this.dateFrom);
//
//     return (date<dateFrom && reqDate!=null);
// }

export function isMoreThanZero(val) {
    return val<=0
}



