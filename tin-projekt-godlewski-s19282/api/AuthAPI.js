const OwnerRepository = require('../repository/sequelize/OwnerRepository');
const config = require('../config/auth/key');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req,res) => {
    const email = req.body.email
    const password = req.body.password

    OwnerRepository.findByEmail(email)
        .then(user => {
            if(!user)
                return res.status(401).send({message: "Nieprawidłowy email lub hasło!"})

            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if(!isEqual)
                        return res.status(401).send({message: "Nieprawidłowy email lub hasło"})

                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user.id,
                            role: user.role_id
                        },
                        config.secret,
                        {expiresIn: '1h'}
                    )
                    res.status(200).json({token: token, userId: user.id, roleId: user.role_id})
                })
                .catch(err => {
                    res.status(501)
                })

        })
}
