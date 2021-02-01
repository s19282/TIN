import {getCurrentUser} from "../helpers/authHelper";

const vehiclesBaseUrl = 'http://localhost:3000/api/vehicles';

export function getVehiclesApiCall()
{
    return fetch(vehiclesBaseUrl);
}

export function getVehicleByIdApiCall(vehicleId)
{
    return fetch(`${vehiclesBaseUrl}/${vehicleId}`);
}

export function addVehicleApiCall(vehicle) {
    const vehicleString = JSON.stringify(vehicle)
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: vehicleString
    }
    return fetch(vehiclesBaseUrl, options);
}

export function updateVehicleApiCall(vehicleId, vehicle) {
    const url = `${vehiclesBaseUrl}/${vehicleId}`
    const vehicleString = JSON.stringify(vehicle)
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: vehicleString
    }
    return fetch(url, options);
}



