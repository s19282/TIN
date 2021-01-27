import {registrationDetailsList} from "./registrationApiMockData";
const registrationBaseUrl = 'http://localhost:3000/api/registrations';

export function getRegistrationsApiCall()
{
    return fetch(registrationBaseUrl);
}
export function getRegistrationByIdApiCall(registrationId)
{
    return registrationDetailsList.find(registration => registration.id === registrationId);
}
