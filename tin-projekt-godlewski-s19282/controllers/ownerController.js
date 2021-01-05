const OwnerRepository = require('../repository/sequelize/OwnerRepository');

exports.showOwnerList = (req,res,next) => {
    OwnerRepository.getOwners()
        .then(owners =>{
            res.render('pages/owner/list',{
                owners: owners,
                navLocation: 'owner',
                validation: 'none',
                validationErrors:[]
            });
        });
}

exports.showAddOwnerForm = (req,res, next) =>
{
    res.render('pages/owner/form', {
        owner: {},
        pageTitle: 'Dodaj właściciela',
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/owners/add',
        navLocation: 'owner',
        validation: 'owner',
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
                formMode: 'showDetails',
                pageTitle: 'Dane właściciela',
                formAction: '',
                navLocation: 'owner',
                validation: 'none',
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
                formMode: 'edit',
                pageTitle: 'Edytuj dane właściciela',
                btnLabel: 'Edytuj',
                formAction: '/owners/edit',
                navLocation: 'owner',
                validation: 'owner',
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
                formMode: 'edit',
                pageTitle: 'Edytuj dane właściciela',
                btnLabel: 'Edytuj',
                formAction: '/owners/edit',
                navLocation: 'owner',
                validation: 'owner',
                validationErrors: err.errors
            //    TODO: email uniqe validation
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
                pageTitle: 'Dodaj właściciela',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/owners/add',
                navLocation: 'owner',
                validation: 'owner',
                validationErrors: err.errors
            });
        });
}
