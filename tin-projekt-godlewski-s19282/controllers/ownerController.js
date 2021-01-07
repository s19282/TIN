const OwnerRepository = require('../repository/sequelize/OwnerRepository');
const AnnouncementRepository = require('../repository/sequelize/AnnouncementRepository');

exports.showOwnerList = (req,res,next) => {
    OwnerRepository.getOwners()
        .then(owners =>{
            res.render('pages/owner/list',{
                owners: owners,
                announcements: AnnouncementRepository.getAnnouncements(),
                navLocation: 'owner',
                formMode: '',
                validationErrors:[]
            });
        });
}

exports.showAddOwnerForm = (req,res, next) =>
{
    res.render('pages/owner/form', {
        owner: {},
        pageTitle: 'Dodaj właściciela',
        announcements: AnnouncementRepository.getAnnouncements(),
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/owners/add',
        navLocation: 'owner',
        validationErrors:[]
    });
}
exports.showOwnerDetails = (req,res, next) =>
{
    const ownerId = req.params.ownerId;
    OwnerRepository.getOwnerById(ownerId)
        .then(owner => {
            res.render('pages/owner/form', {
                owner: owner,
                announcements: AnnouncementRepository.getAnnouncements(),
                formMode: 'showDetails',
                pageTitle: 'Dane właściciela',
                formAction: '',
                navLocation: 'owner',
                validationErrors:[]
            });
        });
}
exports.showEditOwnerForm = (req,res, next) =>
{
    const ownerId = req.params.ownerId;
    OwnerRepository.getOwnerById(ownerId)
        .then(owner => {
            res.render('pages/owner/form', {
                owner: owner,
                announcements: AnnouncementRepository.getAnnouncements(),
                formMode: 'edit',
                pageTitle: 'Edytuj dane właściciela',
                btnLabel: 'Edytuj',
                formAction: '/owners/edit',
                navLocation: 'owner',
                validationErrors:[]
            });
        });
}
exports.deleteOwner = (req,res, next) =>
{
    OwnerRepository.deleteOwner(req.params.ownerId)
        .then( () => res.redirect('/owners'));
}
exports.updateOwner = (req,res, next) =>
{
    let errors;
    OwnerRepository.updateOwner(req.body.id,req.body)
        .then( () => res.redirect('/owners'))
        .catch(err => {
            errors=err.errors;
            errors.forEach(e => {
                if (e.path.includes('email') && e.type === 'unique violation') {
                    e.message = "Podany adres email jest już używany";
                }
            });
            return OwnerRepository.getOwnerById(req.body.id);
        })
        .then(owner => {
            res.render('pages/owner/form', {

                owner: {...req.body,ownerVehicles: owner.ownerVehicles},
                announcements: AnnouncementRepository.getAnnouncements(),
                formMode: 'edit',
                pageTitle: 'Edytuj dane właściciela',
                btnLabel: 'Edytuj',
                formAction: '/owners/edit',
                navLocation: 'owner',
                validationErrors: errors
            });
        });
}
exports.addOwner = (req,res, next) =>
{
    OwnerRepository.createOwner(req.body)
        .then( () => res.redirect('/owners'))
        .catch(err => {
            let errors = err.errors;
            errors.forEach(e => {
                if (e.path.includes('email') && e.type === 'unique violation') {
                    e.message = "Podany adres email jest już używany";
                }
            });
            res.render('pages/owner/form', {
                owner: req.body,
                announcements: AnnouncementRepository.getAnnouncements(),
                pageTitle: 'Dodaj właściciela',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/owners/add',
                navLocation: 'owner',
                validationErrors: errors
            });
        });
}
