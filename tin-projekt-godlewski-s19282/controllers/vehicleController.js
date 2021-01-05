const VehicleRepository = require('../repository/sequelize/VehicleRepository');

exports.showVehicleList = (req,res,next) => {
    VehicleRepository.getVehicles()
        .then(vehicles =>{
            res.render('pages/vehicle/list',{
                vehicles: vehicles,
                navLocation: 'vehicle',
                validation: 'none',
                validationErrors:[]
            });
        });
}

exports.showAddVehicleForm = (req,res, next) =>
{
    res.render('pages/vehicle/form', {
        vehicle: {},
        pageTitle: 'Dodaj pojazd',
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/vehicles/add',
        navLocation: 'vehicle',
        validation: 'vehicle',
        validationErrors:[]
    });
}
exports.showVehicleDetails = (req,res, next) =>
{
    const vehicleId = req.params.vehicleId;
    VehicleRepository.getVehicleById(vehicleId)
        .then(vehicle => {
            res.render('pages/vehicle/form', {
                vehicle: vehicle,
                formMode: 'showDetails',
                pageTitle: 'Dane pojazdu',
                formAction: '',
                navLocation: 'vehicle',
                validation: 'none',
                validationErrors:[]
            })
        })
}
exports.showEditVehicleForm = (req,res, next) =>
{
    const vehicleId = req.params.vehicleId;
    VehicleRepository.getVehicleById(vehicleId)
        .then(vehicle => {
            res.render('pages/vehicle/form', {
                vehicle: vehicle,
                formMode: 'edit',
                pageTitle: 'Edytuj dane pojazdu',
                btnLabel: 'Edytuj',
                formAction: '/vehicles/edit',
                navLocation: 'vehicle',
                validation: 'vehicle',
                validationErrors:[]
            });
        });
}
exports.deleteVehicle = (req,res, next) =>
{
    VehicleRepository.deleteVehicle(req.params.vehicleId)
        .then( () => res.redirect('/vehicles'));
}
exports.updateVehicle = (req,res, next) =>
{
    VehicleRepository.updateVehicle(req.body.id,req.body)
        .then( () => res.redirect('/vehicles'))
        .catch(err => {
            res.render('pages/vehicle/form', {
                vehicle: req.body,
                pageTitle: 'Edytuj pojazd',
                formMode: 'createNew',
                btnLabel: 'Edytuj',
                formAction: '/vehicles/edit',
                navLocation: 'vehicle',
                validation: 'vehicle',
                validationErrors: err.errors
            });
        });
}
exports.addVehicle = (req,res, next) =>
{
    VehicleRepository.createVehicle(req.body)
        .then( () => res.redirect('/vehicles'))
        .catch(err => {
            res.render('pages/vehicle/form', {
                vehicle: req.body,
                pageTitle: 'Dodaj pojazd',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/vehicles/add',
                navLocation: 'vehicle',
                validation: 'vehicle',
                validationErrors: err.errors
            });
        });
}