const OwnerRepository = require('../repository/sequelize/OwnerRepository');

exports.showOwnerList = (req,res,next) => {
    OwnerRepository.getOwners()
        .then(owners =>{
            res.render('pages/owner/list',{
                owners: owners,
                navLocation: 'owner',
                validation: 'none'
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
        validation: 'owner'
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
                validation: 'none'
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
        .then( () => res.redirect('/owners'));
}
exports.addOwner = (req,res, next) =>
{
    OwnerRepository.createOwner(req.body)
        .then( () => res.redirect('/owners'));
}
