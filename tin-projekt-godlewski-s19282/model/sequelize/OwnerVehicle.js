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
            isSameOrBefore(reqDate){
                const today = new Date();
                const date = new Date(reqDate);
                if(date>today)
                    throw new Error("Data nie może być z przyszłości");
            }
        }
    },
    dateTo: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        validate: {
            isSameOrBefore(reqDate){
                const today = new Date();
                const date = new Date(reqDate);
                if(date>today)
                    throw new Error("Data nie może być z przyszłości");
            },
            isSameOrAfter(reqDate)
            {
                const date = new Date(reqDate);
                const dateFrom = new Date(this.dateFrom);
                if(date<dateFrom && reqDate!=null)
                    throw new Error("Data końca rejestracji nie może być wcześniejsza niż data początku rejestracji");
            }


        }
    },
    registrationNumber: {
        type: Sequelize.STRING(9),
        allowNull: false,
        unique: true,
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
        unique: true,
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
        allowNull: false,
        validate: {
            notSelected(val)
            {
                if(val==='')
                    throw new Error('Musisz wybrać właściciela');
            }
        }
    },
    vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notSelected(val) {
                if (val === '')
                    throw new Error('Musisz wybrać pojazd');
            }
        }
    }

});

module.exports = OwnerVehicle;