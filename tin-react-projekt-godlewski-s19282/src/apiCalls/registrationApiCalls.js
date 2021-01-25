import {registrationList,registrationDetailsList} from "./registrationApiMockData";

export function getRegistrationsApiCall()
{
    return registrationList;
}
export function getRegistrationByIdApiCall(registrationId)
{
    return registrationDetailsList.find(registration => registration.id === registrationId);
}
