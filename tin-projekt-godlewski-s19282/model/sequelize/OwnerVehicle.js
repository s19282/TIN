const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const OwnerVehicle = sequelize.define('OwnerVehicle', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    dateFrom: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    dateTo: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    registrationNumer: {
        type: Sequelize.STRING(8),
        allowNull: false
    },
    insuranceNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    vehicleId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = OwnerVehicle;