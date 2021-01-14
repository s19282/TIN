const RegistrationRepository = require('../repository/sequelize/RegistrationRepository');
const OwnerRepository = require('../repository/sequelize/OwnerRepository');
const VehicleRepository = require('../repository/sequelize/VehicleRepository');
const AnnouncementRepository = require('../repository/sequelize/AnnouncementRepository');

exports.showRegistrationList = (req, res, next) => {
    RegistrationRepository.getRegistration()
        .then(registrations =>  {
            res.render('pages/registration/list',{
                registrations: registrations,
                announcements: AnnouncementRepository.getAnnouncements(),
                navLocation: 'registration',
                formMode: '',
                validationErrors:[]
            });
        });
}

exports.showAddRegistrationForm = (req, res, next) =>
{
    let allOwners, allVehicles;
    OwnerRepository.getOwners()
        .then(owners => {
            allOwners=owners;
            return VehicleRepository.getVehicles();
        })
        .then(vehicles => {
            allVehicles = vehicles;
            res.render('pages/registration/form',{
                registration: {},
                allOwners: allOwners,
                announcements: AnnouncementRepository.getAnnouncements(),
                allVehicles: allVehicles,
                pageTitle: req.__('registration.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('registration.form.add.btnLabel'),
                formAction: '/registrations/add',
                navLocation: 'registration',
                validationErrors:[]
            });
        });
}

exports.showRegistrationDetails = (req, res, next) =>
{
    const registrationId = req.params.registrationId;
    let allOwners, allVehicles;
    OwnerRepository.getOwners()
        .then(owners => {
            allOwners=owners;
            return VehicleRepository.getVehicles();
        })
        .then(vehicles => {
            allVehicles = vehicles;
            return RegistrationRepository.getRegistrationById(registrationId);
        })
        .then( registration =>{
            res.render('pages/registration/form', {
                registration: registration,
                announcements: AnnouncementRepository.getAnnouncements(),
                allOwners: allOwners,
                allVehicles: allVehicles,
                formMode: 'showDetails',
                pageTitle: req.__('registration.form.details.pageTitle'),
                formAction: '',
                navLocation: 'registration',
                validationErrors:[]
            });
        });
}

exports.showEditRegistrationForm = (req, res, next) =>
{
    const registrationId = req.params.registrationId;
    let allOwners, allVehicles;
    OwnerRepository.getOwners()
        .then(owners => {
            allOwners=owners;
            return VehicleRepository.getVehicles();
        })
        .then(vehicles => {
            allVehicles = vehicles;
            return RegistrationRepository.getRegistrationById(registrationId);
        })
        .then(registration => {
            res.render('pages/registration/form', {
                registration: registration,
                announcements: AnnouncementRepository.getAnnouncements(),
                allOwners: allOwners,
                allVehicles: allVehicles,
                formMode: 'edit',
                pageTitle: req.__('registration.form.edit.pageTitle'),
                btnLabel: req.__('registration.form.edit.btnLabel'),
                formAction: '/registrations/edit',
                navLocation: 'registration',
                validationErrors:[]
            });
        });
}

exports.deleteRegistration = (req,res, next) =>
{
    RegistrationRepository.deleteRegistration(req.params.registrationId)
        .then( () => res.redirect('/registrations'));
}
exports.updateRegistration = (req,res, next) =>
{
    if(req.body.dateTo==='')    req.body.dateTo=null;

    let allOwners, allVehicles;

    OwnerRepository.getOwners()
        .then(owners => {
            allOwners=owners;
            return VehicleRepository.getVehicles();
        })
        .then(vehicles => {
            allVehicles = vehicles;
            return RegistrationRepository.updateRegistration(req.body.id,req.body)
        })
        .then( () => { res.redirect('/registrations')})
        .catch(err => {
            let errors = err.errors;
            errors.forEach(e => {
                if (e.path.includes('registrationNumber') && e.type === 'unique violation') {
                    e.message = req.__('registration.controller.registrationNumberNotUnique');
                }
                if (e.path.includes('insuranceNumber') && e.type === 'unique violation') {
                    e.message = req.__('registration.controller.insuranceNumberNotUnique');
                }
            });
            res.render('pages/registration/form', {
                registration: req.body,
                announcements: AnnouncementRepository.getAnnouncements(),
                allOwners: allOwners,
                allVehicles: allVehicles,
                formMode: 'edit',
                pageTitle: req.__('registration.form.edit.pageTitle'),
                btnLabel: req.__('registration.form.edit.btnLabel'),
                formAction: '/registrations/edit',
                navLocation: 'registration',
                validationErrors: errors
            });
        });
}
exports.addRegistration = (req,res, next) =>
{
    if(req.body.dateTo==='')    req.body.dateTo=null;

    let allOwners, allVehicles;

    OwnerRepository.getOwners()
        .then(owners => {
            allOwners=owners;
            return VehicleRepository.getVehicles();
        })
        .then(vehicles => {
            allVehicles = vehicles;
            return RegistrationRepository.createRegistration(req.body);
        })
        .then( () => res.redirect('/registrations'))
        .catch(err => {
            let errors = err.errors;
            errors.forEach(e => {
                if (e.path.includes('registrationNumber') && e.type === 'unique violation') {
                    e.message = "Podany numer rejestracyjny jest już używany";
                }
                if (e.path.includes('insuranceNumber') && e.type === 'unique violation') {
                    e.message = "Podany numer rejestracyjny jest już używany";
                }
            });
            res.render('pages/registration/form', {
                registration: req.body,
                allOwners: allOwners,
                allVehicles: allVehicles,
                announcements: AnnouncementRepository.getAnnouncements(),
                pageTitle: req.__('registration.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('registration.form.add.btnLabel'),
                formAction: '/registrations/add',
                navLocation: 'registration',
                validationErrors: errors
            });
        });
}

