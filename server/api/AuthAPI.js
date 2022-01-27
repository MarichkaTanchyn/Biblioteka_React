const config = require('../config/auth/key')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const EmployeeRepository = require("../repository/mysql2/EmployeeRepository");

exports.login = (req, res) => {
    const email = req.body.Email;
    const password = req.body.password;
    EmployeeRepository.findByEmail(email)
        .then(emp => {
            if (!emp) {
                return res.status(401).send({message: "Invalid name or password"})
            }

            bcrypt.compare(password, emp.password)
                .then(isEqual => {
                    if (!isEqual) {
                        console.log(isEqual)
                        return res.status(401).send({message: "Invalid name or password"})
                    }
                    const token = jwt.sign(
                        {
                            email: emp.Email,
                            userId: emp.id
                        },
                        config.secret,
                        {expiresIn: '1h'}
                    )
                    res.status(200).json({ token: token, userId: emp.id })
                })
                .catch(err => {
                    console.log(err)
                    res.status(501)
                })
        })
}