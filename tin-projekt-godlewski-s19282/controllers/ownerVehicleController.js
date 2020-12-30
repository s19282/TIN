const RegistrationRepository = require('../repository/sequelize/RegistrationRepository');
const OwnerRepository = require('../repository/sequelize/OwnerRepository');
const VehicleRepository = require('../repository/sequelize/VehicleRepository');

exports.showOwnerVehicleList = (req,res,next) => {
    RegistrationRepository.getRegistration()
        .then(registrations =>  {
            res.render('pages/ownerVehicle/list',{
                registrations: registrations,
                navLocation: 'ownerVehicle',
                validation: 'none'
            });
        });
}

exports.showAddOwnerVehicleForm = (req,res, next) =>
{
    let allOwners, allVehicles;
    OwnerRepository.getOwners()
        .then(owners => {
            allOwners=owners;
            return VehicleRepository.getVehicles();
        })
        .then(vehicles => {
            allVehicles = vehicles;
            res.render('pages/ownerVehicle/form',{
                registration: {},
                allOwners: allOwners,
                allVehicles: allVehicles,
                pageTitle: 'Dodaj rejestrację',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/registrations/add',
                navLocation: 'ownerVehicle',
                validation: 'ownerVehicle'
            });
        });
}

exports.showOwnerVehicleDetails = (req,res, next) =>
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
            res.render('pages/ownerVehicle/form', {
                registration: registration,
                allOwners: allOwners,
                allVehicles: allVehicles,
                formMode: 'showDetails',
                pageTitle: 'Dane rejestracji',
                formAction: '',
                navLocation: 'ownerVehicle',
                validation: 'none'
            });
        });
}

exports.showEditOwnerVehicleForm = (req,res, next) =>
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
            res.render('pages/ownerVehicle/form', {
                registration: registration,
                allOwners: allOwners,
                allVehicles: allVehicles,
                formMode: 'edit',
                pageTitle: 'Edytuj dane rejestracji',
                btnLabel: 'Edytuj',
                formAction: '/registrations/edit',
                navLocation: 'ownerVehicle',
                validation: 'ownerVehicle',
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

    let allOwners, allVehicles, registration;

    OwnerRepository.getOwners()
        .then(owners => {
            allOwners=owners;
            return VehicleRepository.getVehicles();
        })
        .then(vehicles => {
            allVehicles = vehicles;
            return RegistrationRepository.updateRegistration(req.body.id,req.body)
        })
        .then( (reg) => {
            registration = reg;
            res.redirect('/registrations');
        })
        .catch(err => {
            res.render('pages/employee/form', {
                registration: registration,
                allOwners: allOwners,
                allVehicles: allVehicles,
                formMode: 'edit',
                pageTitle: 'Edytuj dane rejestracji',
                btnLabel: 'Edytuj',
                formAction: '/registrations/edit',
                navLocation: 'ownerVehicle',
                validation: 'ownerVehicle',
                validationErrors: err.errors
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
            res.render('pages/employee/form', {
                registration: {},
                allOwners: allOwners,
                allVehicles: allVehicles,
                pageTitle: 'Dodaj rejestrację',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/registrations/add',
                navLocation: 'ownerVehicle',
                validation: 'ownerVehicle',
                validationErrors: err.errors
            });
        });
}

