const EmployeeRepository = require('../repository/mysql2/EmployeeRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.loginEmail;
    const password = req.body.loginPassword;

    EmployeeRepository.findByEmail(email)
        .then(emp => {
            if (!emp) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if (authUtil.comparePasswords(password, emp[0].Password) === true) {
                req.session.loggedUser = emp[0];
                console.log("logedIn");
                res.redirect('/employees');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}
