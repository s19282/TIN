import {getCurrentUser} from "../helpers/authHelper";

const registrationBaseUrl = 'http://localhost:3000/api/registrations';

export function getRegistrationsApiCall()
{
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(registrationBaseUrl,options);
}
export function getRegistrationByIdApiCall(registrationId)
{
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(`${registrationBaseUrl}/${registrationId}`,options);
}
export function addRegistrationApiCall(registration)
{
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const registrationString = JSON.stringify(registration)
    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body : registrationString
    }
    return fetch(registrationBaseUrl,options);
}
export function updateRegistrationApiCall(registrationId, registration)
{
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${registrationBaseUrl}/${registrationId}` //TODO: check once more
    const registrationString = JSON.stringify(registration)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: registrationString
    }
    return fetch(url,options);
}
export function deleteRegistrationApiCall(registrationId)
{
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${registrationBaseUrl}/${registrationId}` //TODO: check once more

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(url,options);
}