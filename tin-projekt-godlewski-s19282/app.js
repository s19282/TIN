const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authUtil = require('./util/authUtils');
const i18n = require('i18n');
require('dotenv').config();

const indexRouter = require('./routes/index');
const ownerRouter = require('./routes/ownerRoute');
const registrationRouter = require('./routes/registrationRoute');
const vehicleRouter = require('./routes/vehicleRoute');
const sequelizeInit = require('./config/sequelize/init');
const ownerApiRouter = require('./routes/api/OwnerApiRoute');
const registrationApiRouter = require('./routes/api/RegistrationApiRoute');
const vehicleApiRouter = require('./routes/api/VehicleApiRoute');
const authApiRouter = require('./routes/api/AuthApiRoute');
const session = require('express-session');
const app = express();
const cors = require('cors');



app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
i18n.configure({
    locales: ['pl','en'],
    directory: path.join(__dirname, 'locales'),
    objectNotation: true,
    cookie: 'tin_car_registration'
})
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.sessionPassword,
    resave: true,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.loggedUser = req.session.loggedUser;
    if(!res.locals.loginError){
        res.locals.loginError = undefined;
    }
    next();
});
app.use((req, res, next) => {
    if(!res.locals.lang) {
        res.locals.lang = req.cookies['tin_car_registration'];
    }
    next();
});
app.use('/api/owners', ownerApiRouter);
app.use('/api/registrations', registrationApiRouter);
app.use('/api/vehicles', vehicleApiRouter);
app.use('/api/auth', authApiRouter);
app.use('/', indexRouter);
app.use('/owners', authUtil.permitAuthenticatedUser, ownerRouter);
app.use('/registrations', authUtil.permitAuthenticatedUser, registrationRouter);
app.use('/vehicles', vehicleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


sequelizeInit()
    .catch(err => {
        console.log(err);
    });

module.exports = app;
