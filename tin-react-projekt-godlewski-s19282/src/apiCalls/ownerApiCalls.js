import {ownerDetailsList, ownerList} from "./ownerApiMockData";

export function getOwnersApiCall() {
    return ownerList;
}
export function getOwnerByIdApiCall(ownerId)
{
    return ownerDetailsList.find(owner => owner.id === ownerId);
}