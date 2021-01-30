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
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: vehicleString
    }
    return fetch(vehiclesBaseUrl, options);
}

export function updateVehicleApiCall(vehicleId, vechicle) {
    const url = `${vehiclesBaseUrl}/${vehicleId}`
    const vehicleString = JSON.stringify(vechicle)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: vehicleString
    }
    return fetch(url, options);
}



