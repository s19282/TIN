const registrationBaseUrl = 'http://localhost:3000/api/registrations';

export function getRegistrationsApiCall()
{
    return fetch(registrationBaseUrl);
}
export function getRegistrationByIdApiCall(registrationId)
{
    return fetch(`${registrationBaseUrl}/${registrationId}`);
}
export function addRegistrationApiCall(registration)
{
    const registrationString = JSON.stringify(registration)
    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : registrationString
    }
    return fetch(registrationBaseUrl,options);
}
export function updateRegistrationApiCall(registrationId, registration)
{
    const url = `${registrationBaseUrl}/${registrationId}` //TODO: check once more
    const registrationString = JSON.stringify(registration)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: registrationString
    }
    return fetch(url,options);
}