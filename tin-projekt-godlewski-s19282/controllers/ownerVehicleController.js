const RegistrationRepository = require('../repository/sequelize/RegistrationRepository');
const OwnerRepository = require('../repository/sequelize/OwnerRepository');
const VehicleRepository = require('../repository/sequelize/VehicleRepository');
const AnnouncementRepository = require('../repository/sequelize/AnnouncementRepository');

exports.showOwnerVehicleList = (req,res,next) => {
    RegistrationRepository.getRegistration()
        .then(registrations =>  {
            res.render('pages/ownerVehicle/list',{
                registrations: registrations,
                announcements: AnnouncementRepository.getAnnouncements(),
                navLocation: 'ownerVehicle',
                formMode: '',
                validationErrors:[]
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
                announcements: AnnouncementRepository.getAnnouncements(),
                allVehicles: allVehicles,
                pageTitle: 'Dodaj rejestrację',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/registrations/add',
                navLocation: 'ownerVehicle',
                validationErrors:[]
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
                announcements: AnnouncementRepository.getAnnouncements(),
                allOwners: allOwners,
                allVehicles: allVehicles,
                formMode: 'showDetails',
                pageTitle: 'Dane rejestracji',
                formAction: '',
                navLocation: 'ownerVehicle',
                validationErrors:[]
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
                announcements: AnnouncementRepository.getAnnouncements(),
                allOwners: allOwners,
                allVehicles: allVehicles,
                formMode: 'edit',
                pageTitle: 'Edytuj dane rejestracji',
                btnLabel: 'Edytuj',
                formAction: '/registrations/edit',
                navLocation: 'ownerVehicle',
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
                    e.message = "Podany numer rejestracyjny jest już używany";
                }
                if (e.path.includes('insuranceNumber') && e.type === 'unique violation') {
                    e.message = "Podany numer rejestracyjny jest już używany";
                }
            });
            res.render('pages/ownerVehicle/form', {
                registration: req.body,
                announcements: AnnouncementRepository.getAnnouncements(),
                allOwners: allOwners,
                allVehicles: allVehicles,
                formMode: 'edit',
                pageTitle: 'Edytuj dane rejestracji',
                btnLabel: 'Edytuj',
                formAction: '/registrations/edit',
                navLocation: 'ownerVehicle',
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
            res.render('pages/ownerVehicle/form', {
                registration: req.body,
                allOwners: allOwners,
                allVehicles: allVehicles,
                announcements: AnnouncementRepository.getAnnouncements(),
                pageTitle: 'Dodaj rejestrację',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/registrations/add',
                navLocation: 'ownerVehicle',
                validationErrors: errors
            });
        });
}

