const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const i18n = require('i18n');

const Owner = sequelize.define('Owner', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2,60],
                msg: "len_2_60"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2,60],
                msg: "len_2_60"
            },
        }
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [5,60],
                msg: "len_5_60"
            },
            isEmail: {
                msg: "notEmail"
            }
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [7,13],
                msg: "len_7_13"
            },
            isNumeric: {
                msg: "notNumber"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len: {
                args: [7,100],
                msg: "len_7_100"
            }
        }
    },
    role_id:{
        type: Sequelize.INTEGER,
        default: true,
        defaultValue: 2
    }
});

module.exports = Owner;

