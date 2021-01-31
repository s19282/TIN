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
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [5,30],
                msg: "len_5_30"
            }
        }
    },
    make: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2,30],
                msg: "len_2_30"
            }
        }
    },
    model: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [1,30],
                msg: "len_1_30"
            }
        }
    },
    firstRegistrationDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isSameOrBefore(reqDate){
                const today = new Date();
                const date = new Date(reqDate);
                if(date>today)
                    throw new Error("notFutureDate");
            }
        }
    },
    engineCapacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isMoreThanZero(val) {
                if(val<=0)
                    throw new Error("greaterThan0")
            },
            isNumeric: {
                msg: "notNumber"
            }
        }
    }

});

module.exports = Vehicle;