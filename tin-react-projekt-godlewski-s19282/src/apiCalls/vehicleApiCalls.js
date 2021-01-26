import {vehicleDetailsList, vehicleList} from "./vehicleApiMockData";

export function getVehiclesApiCall()
{
    return vehicleList;
}

export function getVehicleByIdApiCall(vehicleId)
{
    return vehicleDetailsList.find(vehicle => vehicle.id === vehicleId);
}