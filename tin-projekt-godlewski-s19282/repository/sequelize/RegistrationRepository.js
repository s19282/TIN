const Sequelize = require('sequelize');

const Owner = require("../../model/sequelize/Owner");
const Registration = require("../../model/sequelize/OwnerVehicle");
const Vehicle = require("../../model/sequelize/Vehicle_");

exports.getRegistration = () => {
    return Registration.findAll({include: [
            {
                model: Owner,
                as: 'owner'
            },
            {
                model: Vehicle,
                as: 'vehicle'
            }]
    });
};


exports.getRegistrationById = (registrationId) => {
    return Registration.findByPk(registrationId, {include: [
            {
                model: Owner,
                as: 'owner'
            },
            {
                model: Vehicle,
                as: 'vehicle'
            }]
    });
};

exports.createRegistration = (data) => {
    console.log(JSON.stringify(data));

    return Registration.create({
        owner_id: data.owner_id,
        vehicle_id: data.vehicle_id,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        registrationNumber: data.registrationNumber,
        insuranceNumber: data.insuranceNumber
    });
};

exports.updateRegistration = (registrationId, data) => {
    return Registration.update(data, {where: {id: registrationId }});
}

exports.deleteRegistration = (registrationId) => {
    return Registration.destroy({
        where: { _id: registrationId }
    });
}

exports.deleteManyRegistrations = (registrationIds) => {
    return Registration.find({ id: { [Sequelize.Op.in]: registrationIds }})
}

