const RegistrationRepository = require('../repository/sequelize/RegistrationRepository');

exports.getRegistrations = (req, res, next) => {
    RegistrationRepository.getRegistration()
        .then(registrations => {
            res.status(200).json(registrations);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getRegistrationById = (req, res, next) => {
    const registrationId = req.params.registrationId;
    RegistrationRepository.getRegistrationById(registrationId)
        .then(owner => {
            if(!owner) {
                res.status(404).json({
                    message: 'Registration with id: '+registrationId+' not found'
                })
            } else {
                res.status(200).json(owner);
            }
        });
};

exports.createRegistration = (req, res, next) => {
    RegistrationRepository.createRegistration(req.body)
        .then(newReg => {
            res.status(201).json(newReg);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateRegistration = (req, res, next) => {
    const registrationId = req.params.registrationId;
    RegistrationRepository.updateRegistration(registrationId, req.body)
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

exports.deleteRegistration = (req, res, next) => {
    const registrationId = req.params.registrationId;
    RegistrationRepository.deleteRegistration(registrationId)
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

exports.deleteManyRegistrations = (req, res, next) => {
    let counter = 0;
    for(let i=0; i<req.params.length; i++)
    {
        RegistrationRepository.deleteRegistration(req.params[i]).then(r => counter+=res);
    }
    res.status(200).json({message: 'Removed registrations', rowsRemoved: counter});
}
