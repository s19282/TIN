const OwnerRepository = require('../repository/sequelize/OwnerRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    OwnerRepository.findByEmail(email)
        .then(owner =>{
            if(!owner){
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                });
            }
            else if(authUtil.comparePasswords(password,owner.password) === true){
                req.session.loggedUser = owner;
                res.redirect('/');
            }
            else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                });
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.logout = (req,res,next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}