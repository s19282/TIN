const ownersBaseUrl = 'http://localhost:3000/api/owners';

export function getOwnersApiCall() {
    return fetch(ownersBaseUrl);
}
export function getOwnerByIdApiCall(ownerId)
{
    return fetch(`${ownersBaseUrl}/${ownerId}`);
}
export function addOwnerApiCall(owner)
{
    const ownerString = JSON.stringify(owner)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: ownerString
    }
    return fetch(ownersBaseUrl, options)
}

export function updateOwnerApiCall(ownerId,owner){
    const url = `${ownersBaseUrl}/${ownerId}`
    const ownerString = JSON.stringify(owner)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: ownerString
    }
    return fetch(url, options)
}