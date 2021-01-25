import {ownerList, ownerDetailsList} from "./ownerApiMockData";

export function getOwnersApiCall() {
    return ownerList;
}
export function getOwnerByIdApiCall(ownerId) {
    const owner = ownerDetailsList.find(owner => owner.id === ownerId);
    return owner;
}