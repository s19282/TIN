const OwnerVehicleRepository = require('../repository/sequelize/RegistrationRepository');

exports.getOwnerVehicles = (req, res, next) => {
    OwnerVehicleRepository.getRegistration()
        .then(ownersVehicles => {
            res.status(200).json(ownersVehicles);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOwnerVehicleById = (req, res, next) => {
    const ownerVehicleId = req.params.ownerVehicleId;
    OwnerVehicleRepository.getRegistrationById(ownerVehicleId)
        .then(owner => {
            if(!owner) {
                res.status(404).json({
                    message: 'Registration with id: '+ownerVehicleId+' not found'
                })
            } else {
                res.status(200).json(owner);
            }
        });
};

exports.createOwnerVehicle = (req, res, next) => {
    OwnerVehicleRepository.createRegistration(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateOwnerVehicle = (req, res, next) => {
    const ownerVehicleId = req.params.ownerVehicleId;
    OwnerVehicleRepository.updateRegistration(ownerVehicleId, req.body)
        .then(result => {
            res.status(200).json({message: 'Registration updated!', rowsModified: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteOwnerVehicle = (req, res, next) => {
    const ownerVehicleId = req.params.ownerVehicleId;
    OwnerVehicleRepository.deleteRegistration(ownerVehicleId)
        .then(result => {
            res.status(200).json({message: 'Removed registration', rowsRemoved: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteManyOwnerVehicles = (req,res,next) => {
    let counter = 0;
    for(let i=0; i<req.params.length; i++)
    {
        OwnerVehicleRepository.deleteRegistration(req.params[i]).then(r => counter+=res);
    }
    res.status(200).json({message: 'Removed registrations', rowsRemoved: counter});
}
