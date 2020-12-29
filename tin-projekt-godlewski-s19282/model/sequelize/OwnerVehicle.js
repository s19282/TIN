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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isSameOrBefore: Date.now()
        }
    },
    dateTo: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        validate: {
            isSameOrBefore: Date.now(),
            isSameOrAfter: this.dateFrom

        }
    },
    registrationNumber: {
        type: Sequelize.STRING(9),
        allowNull: false,
        validate: {
            isRegistrationNumber(val){
                val = val.toString().trim();
                const re = /^([A-Z]{2,3}) (\d{4,5})$/i;
                if(!re.test(val))
                    throw new Error('Pole powinno zawierać prawidłowy numer rejestracyjny');
            }
        }

    },
    insuranceNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [9,9],
                msg: "Pole powinno zawierać 9 znaków"
            }
        }
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