const Owner = require("../../model/sequelize/Owner");
const Registration = require("../../model/sequelize/Registration");
const Vehicle = require("../../model/sequelize/Vehicle_");

exports.getVehicles = () =>
{
     return Vehicle.findAll();
}

exports.getVehicleById = (vehicleId) => {
    return Vehicle.findByPk(vehicleId,
        {
            include: [{
                model: Registration,
                as: 'registrations',
                include: [{
                    model: Owner,
                    as: 'owner'
                }]
            }]
        });
};

exports.createVehicle = (newVehicleData) => {
    return Vehicle.create({
        vin: newVehicleData.vin,
        make: newVehicleData.make,
        model: newVehicleData.model,
        firstRegistrationDate: newVehicleData.firstRegistrationDate,
        engineCapacity: newVehicleData.engineCapacity
    });
};

exports.updateVehicle = (vehicleId, vehicleData) => {
    const vin = vehicleData.vin;
    const make = vehicleData.make;
    const model = vehicleData.model;
    const firstRegistrationDate = vehicleData.firstRegistrationDate;
    const engineCapacity = vehicleData.engineCapacity;
    return Vehicle.update(vehicleData, {where: {id: vehicleId }});
};

exports.deleteVehicle = (vehicleId) => {
    return Vehicle.destroy({
        where: { id: vehicleId }
    });
};