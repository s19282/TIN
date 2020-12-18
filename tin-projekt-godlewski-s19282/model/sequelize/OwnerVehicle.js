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
    registrationNumber: {
        type: Sequelize.STRING(9),
        allowNull: false
    },
    insuranceNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = OwnerVehicle;