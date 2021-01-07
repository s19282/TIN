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
        pageTitle: 'Dodaj pojazd',
        formMode: 'createNew',
        btnLabel: 'Dodaj',
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
                pageTitle: 'Dane pojazdu',
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
                pageTitle: 'Edytuj dane pojazdu',
                btnLabel: 'Edytuj',
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
                    e.message = "Podany numer VIN jest już używany";
                }
            });
            return VehicleRepository.getVehicleById(req.body.id);
        })
        .then(vehicle =>{
            res.render('pages/vehicle/form', {
                vehicle: {...req.body,ownerVehicles: vehicle.ownerVehicles},
                pageTitle: 'Edytuj pojazd',
                announcements: AnnouncementRepository.getAnnouncements(),
                formMode: 'edit',
                btnLabel: 'Edytuj',
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
                    e.message = "Podany numer VIN jest już używany";
                }
            });
            res.render('pages/vehicle/form', {
                vehicle: req.body,
                pageTitle: 'Dodaj pojazd',
                announcements: AnnouncementRepository.getAnnouncements(),
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/vehicles/add',
                navLocation: 'vehicle',
                validationErrors: errors
            });
        });
}