const Owner = require("../../model/sequelize/Owner");
const Registration = require("../../model/sequelize/OwnerVehicle");
const Vehicle = require("../../model/sequelize/Vehicle_");

exports.getOwners = () =>
{
    return Owner.findAll();
}

exports.getOwnerById = (ownerId) => {
    return Owner.findByPk(ownerId,
        {
            include: [{
                model: Registration,
                as: 'ownerVehicles',
                include: [{
                    model: Vehicle,
                    as: 'vehicle'
                }]
            }]
        });
};

exports.createOwner = (newOwnerData) => {
    return Owner.create({
        firstName: newOwnerData.firstName,
        lastName: newOwnerData.lastName,
        email: newOwnerData.email,
        phoneNumber: newOwnerData.phoneNumber
    });
};

exports.updateOwner = (ownerId, ownerData) => {
    const firstName = ownerData.firstName;
    const lastName = ownerData.lastName;
    const email = ownerData.email;
    const phoneNumber = ownerData.phoneNumber;
    return Owner.update(ownerData, {where: {id: ownerId }});
};

exports.deleteOwner = (ownerId) => {
    return Owner.destroy({
        where: { id: ownerId }
    });
};