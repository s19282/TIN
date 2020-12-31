const Sequelize = require('sequelize');
const sequelize = new Sequelize('tin_car_registration', process.env.mySQL_user,process.env.mySQL_password, {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
