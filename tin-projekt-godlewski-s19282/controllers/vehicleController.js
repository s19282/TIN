const VehicleRepository = require('../repository/sequelize/VehicleRepository');
const AnnouncementRepository = require('../repository/sequelize/AnnouncementRepository');

exports.showVehicleList = (req,res,next) => {
    VehicleRepository.getVehicles()
        .then(vehicles =>{
            res.render('pages/vehicle/list',{
                announcements: AnnouncementRepository.getAnnouncements(),
                vehicles: vehicles,
                navLocation: 'vehicle',
                formMode: '',
                validationErrors:[]
            });
        });
}

exports.showAddVehicleForm = (req,res, next) =>
{
    res.render('pages/vehicle/form', {
        vehicle: {},
        announcements: AnnouncementRepository.getAnnouncements(),
        pageTitle: req.__('vehicle.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('vehicle.form.add.btnLabel'),
        formAction: '/vehicles/add',
        navLocation: 'vehicle',
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
                announcements: AnnouncementRepository.getAnnouncements(),
                formMode: 'showDetails',
                pageTitle: req.__('vehicle.form.details.pageTitle'),
                formAction: '',
                navLocation: 'vehicle',
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
                announcements: AnnouncementRepository.getAnnouncements(),
                formMode: 'edit',
                pageTitle: req.__('vehicle.form.edit.pageTitle'),
                btnLabel: req.__('vehicle.form.edit.btnLabel'),
                formAction: '/vehicles/edit',
                navLocation: 'vehicle',
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
    let errors;
    VehicleRepository.updateVehicle(req.body.id,req.body)
        .then( () => res.redirect('/vehicles'))
        .catch(err => {
            errors=err.errors;
            errors.forEach(e => {
                if (e.path.includes('vin') && e.type === 'unique violation') {
                    e.message = req.__('vehicle.controller.VINNotUnique');
                }
            });
            return VehicleRepository.getVehicleById(req.body.id);
        })
        .then(vehicle =>{
            res.render('pages/vehicle/form', {
                vehicle: {...req.body,registrations: vehicle.registrations},
                pageTitle: req.__('vehicle.form.edit.pageTitle'),
                announcements: AnnouncementRepository.getAnnouncements(),
                formMode: 'edit',
                btnLabel: req.__('vehicle.form.edit.btnLabel'),
                formAction: '/vehicles/edit',
                navLocation: 'vehicle',
                validationErrors: errors
            });
        });
}
exports.addVehicle = (req,res, next) =>
{
    VehicleRepository.createVehicle(req.body)
        .then( () => res.redirect('/vehicles'))
        .catch(err => {
            let errors=err.errors;
            errors.forEach(e => {
                if (e.path.includes('vin') && e.type === 'unique violation') {
                    e.message = req.__('vehicle.controller.VINNotUnique');
                }
            });
            res.render('pages/vehicle/form', {
                vehicle: req.body,
                pageTitle: req.__('vehicle.form.add.pageTitle'),
                announcements: AnnouncementRepository.getAnnouncements(),
                formMode: 'createNew',
                btnLabel: req.__('vehicle.form.add.btnLabel'),
                formAction: '/vehicles/add',
                navLocation: 'vehicle',
                validationErrors: errors
            });
        });
}