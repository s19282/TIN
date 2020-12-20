var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ownerRouter = require('./routes/ownerRoute');
var ownerVehicleRouter = require('./routes/ownerVehicleRoute');
var vehicleRouter = require('./routes/vehicleRoute');
const sequelizeInit = require('./config/sequelize/init');
const ownerApiRouter = require('./routes/api/OwnerApiRoute');
const ownerVehicleApiRouter = require('./routes/api/OwnerVehicleApiRoute');
const vehicleApiRouter = require('./routes/api/VehicleApiRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/owners', ownerApiRouter);
app.use('/api/ownerVehicles', ownerVehicleApiRouter);
app.use('/api/vehicles', vehicleApiRouter);

app.use('/', indexRouter);
app.use('/owners', ownerRouter);
app.use('/ownerVehicles', ownerVehicleRouter);
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
