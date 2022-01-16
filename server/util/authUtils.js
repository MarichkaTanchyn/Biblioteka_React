const bcrypt = require('bcryptjs');

exports.genSaltSync = (rounds) => {
    return bcrypt.genSaltSync(rounds);
}

exports.hashPassword = (passPlain, salt) => {
    return bcrypt.hashSync(passPlain, salt);
}

exports.comparePasswords = (passPlain, passHash) => {
    return bcrypt.compareSync(passPlain, passHash);
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if (loggedUser) {
        next();
    } else {
        throw new Error('unauthorised access');
    }
}