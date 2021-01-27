import {ownerDetailsList} from "./ownerApiMockData";
const ownersBaseUrl = 'http://localhost:3000/api/owners';

export function getOwnersApiCall() {
    return fetch(ownersBaseUrl);
}
export function getOwnerByIdApiCall(ownerId)
{
    return ownerDetailsList.find(owner => owner.id === ownerId);
}