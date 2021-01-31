const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Registration = sequelize.define('Registration', {
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
    dateTo: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        validate: {
            isSameOrBefore(reqDate){
                const today = new Date();
                const date = new Date(reqDate);
                if(date>today)
                    throw new Error("notFutureDate");
            },
            isSameOrAfter(reqDate)
            {
                const date = new Date(reqDate);
                const dateFrom = new Date(this.dateFrom);
                if(date<dateFrom && reqDate!=null)
                    throw new Error("notBeforeFromDate");
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
                    throw new Error("notRegistrationNumber");
            }
        }

    },
    insuranceNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [9,9],
                msg: "notInsuranceNumber"
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
                    throw new Error("notEmpty");
            }
        }
    },
    vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notSelected(val) {
                if (val === '')
                    throw new Error("notEmpty");
            }
        }
    }

});

module.exports = Registration;