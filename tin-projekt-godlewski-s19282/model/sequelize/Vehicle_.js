const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    vin: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    make: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    model: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    firstRegistrationDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    engineCapacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = Vehicle;