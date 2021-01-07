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
    OwnerRepository.updateOwner(req.body.id,req.body)
        .then( () => res.redirect('/owners'))
        .catch(err => {
            res.render('pages/owner/form', {
                owner: req.body,
                announcements: AnnouncementRepository.getAnnouncements(),
                formMode: 'edit',
                pageTitle: 'Edytuj dane właściciela',
                btnLabel: 'Edytuj',
                formAction: '/owners/edit',
                navLocation: 'owner',
                validationErrors: err.errors
            });
        });
}
exports.addOwner = (req,res, next) =>
{
    OwnerRepository.createOwner(req.body)
        .then( () => res.redirect('/owners'))
        .catch(err => {
            res.render('pages/owner/form', {
                owner: req.body,
                announcements: AnnouncementRepository.getAnnouncements(),
                pageTitle: 'Dodaj właściciela',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/owners/add',
                navLocation: 'owner',
                validationErrors: err.errors
            });
        });
}
