const OwnerRepository = require('../repository/sequelize/OwnerRepository');
const AnnouncementRepository = require('../repository/sequelize/AnnouncementRepository');
const authUtil = require('../util/authUtils');

//TODO: przerobić na sposób Gustawa
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
        pageTitle: req.__('owner.form.add.pageTitle'),
        announcements: AnnouncementRepository.getAnnouncements(),
        formMode: 'createNew',
        btnLabel: req.__('owner.form.add.btnLabel'),
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
                pageTitle: req.__('owner.form.details.pageTitle'),
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
                pageTitle: req.__('owner.form.edit.pageTitle'),
                btnLabel: req.__('owner.form.edit.btnLabel'),
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
    req.body.password = authUtil.hashPassword(req.body.password);

    OwnerRepository.updateOwner(req.body.id,req.body)
        .then( () => res.redirect('/owners'))
        .catch(err => {
            errors=err.errors;
            errors.forEach(e => {
                if (e.path.includes('email') && e.type === 'unique violation') {
                    e.message = req.__('owner.controller.emailNotUnique');
                }
            });
            return OwnerRepository.getOwnerById(req.body.id);
        })
        .then(owner => {
            res.render('pages/owner/form', {

                owner: {...req.body,registrations: owner.registrations},
                announcements: AnnouncementRepository.getAnnouncements(),
                formMode: 'edit',
                pageTitle: req.__('owner.form.edit.pageTitle'),
                btnLabel: req.__('owner.form.edit.btnLabel'),
                formAction: '/owners/edit',
                navLocation: 'owner',
                validationErrors: errors
            });
        });
}
exports.addOwner = (req,res, next) =>
{
    req.body.password = authUtil.hashPassword(req.body.password);

    OwnerRepository.createOwner(req.body)
        .then( () => res.redirect('/owners'))
        .catch(err => {
            let errors = err.errors;
            errors.forEach(e => {
                if (e.path.includes('email') && e.type === 'unique violation') {
                    e.message = req.__('owner.controller.emailNotUnique');
                }
            });
            res.render('pages/owner/form', {
                owner: req.body,
                announcements: AnnouncementRepository.getAnnouncements(),
                pageTitle: req.__('owner.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('owner.form.add.btnLabel'),
                formAction: '/owners/add',
                navLocation: 'owner',
                validationErrors: errors
            });
        });
}
