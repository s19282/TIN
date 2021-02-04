const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Announcement = sequelize.define('Announcement', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dateOfPublication: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        default: true,
        defaultValue: new Date()
    },
    expirationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    text:{
        type: Sequelize.STRING(300),
        allowNull: false
    }
});

module.exports = Announcement;