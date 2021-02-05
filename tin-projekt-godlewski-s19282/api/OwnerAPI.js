const OwnerRepository = require('../repository/sequelize/OwnerRepository');
const {hashPassword} = require("../util/authUtils");


exports.getOwners = (req, res, next) => {
    OwnerRepository.getOwners()
        .then(owners => {
            res.status(200).json(owners);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOwnerById = (req, res, next) => {
    const ownerId = req.params.ownerId;
    OwnerRepository.getOwnerById(ownerId)
        .then(owner => {
            if(!owner) {
                res.status(404).json({
                    message: 'Owner with id: '+ownerId+' not found'
                })
            } else {
                res.status(200).json(owner);
            }
        });
};

exports.createOwner = (req, res, next) => {
    OwnerRepository.createOwner(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                console.log(err)
            }
            next(err);
        //    TODO: replace next with res.json(err)...
        });
};

exports.updateOwner = (req, res, next) => {
    const ownerId = req.params.ownerId;
    OwnerRepository.updateOwner(ownerId, req.body)
        .then(result => {
            res.status(200).json({message: 'Owner updated!', rowsModified: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteOwner = (req, res, next) => {
    const ownerId = req.params.ownerId;
    OwnerRepository.deleteOwner(ownerId)
        .then(result => {
            res.status(200).json({message: 'Removed owner', rowsRemoved: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

