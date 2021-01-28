const vehiclesBaseUrl = 'http://localhost:3000/api/vehicles';

export function getVehiclesApiCall()
{
    return fetch(vehiclesBaseUrl);
}

export function getVehicleByIdApiCall(vehicleId)
{
    return fetch(`${vehiclesBaseUrl}/${vehicleId}`);
}