import {getCurrentUser} from "../helpers/authHelper";

const ownersBaseUrl = 'http://localhost:3000/api/owners';

export function getOwnersApiCall() {
    const user = getCurrentUser()
    let token;
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
    return fetch(ownersBaseUrl,options);
}
export function getOwnerByIdApiCall(ownerId)
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
    return fetch(`${ownersBaseUrl}/${ownerId}`,options);
}
export function addOwnerApiCall(owner)
{
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const ownerString = JSON.stringify(owner)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: ownerString
    }
    return fetch(ownersBaseUrl, options)
}

export function updateOwnerApiCall(ownerId,owner){
    const url = `${ownersBaseUrl}/${ownerId}`
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const ownerString = JSON.stringify(owner)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: ownerString
    }
    return fetch(url, options)
}
export function deleteOwnerApiCall(ownerId){
    const url = `${ownersBaseUrl}/${ownerId}`
    const user = getCurrentUser()
    let token
    if (user && user.token)
        token = user.token

    const options =
    {
        method: 'DELETE',
        headers:
        {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(url, options)
}