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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5,30],
                msg: "Pole powinno zawierać od 5 do 30 znaków"
            }
        }
    },
    make: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,30],
                msg: "Pole powinno zawierać od 5 do 30 znaków"
            }
        }
    },
    model: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [1,30],
                msg: "Pole powinno zawierać od 5 do 30 znaków"
            }
        }
    },
    firstRegistrationDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isBefore: new Date().setDate(new Date().getDate()+1)
        }
    },
    engineCapacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isMoreThanZero(val) {
                if(val<=0)
                    throw new Error('Pojemność silnika musi być większa od zera')
            }
        }
    }

});

module.exports = Vehicle;