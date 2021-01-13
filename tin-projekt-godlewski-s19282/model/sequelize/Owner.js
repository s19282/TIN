const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Owner = sequelize.define('Owner', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING(40),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5,60],
                msg: "Pole powinno zawierać od 5 do 60 znaków"
            },
            isEmail: {
                msg: 'Pole powinno zawierać prawidłowy adres email'
            }
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [7,12],
                msg: "Pole powinno zawierać od 7 do 12 znaków"
            },
            isNumeric: {
                msg: "Pole musi być liczbą"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isLongerThan(pass){
                if(pass.length<7)
                    throw new Error("Pole powinno zawierać przynajmniej 7 znaków");
            }
        }
    }
});

module.exports = Owner;

