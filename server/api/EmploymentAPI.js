const EmploymentRepository = require('../repository/mysql2/EmploymentRepository');

exports.getEmployments = (reg, res, next) => {
    EmploymentRepository.getEmployments()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

exports.getEmploymentById = (req, res, next) => {
    const empId = req.params.emplId;
    EmploymentRepository.getEmploymentById(empId)
        .then(emp => {
            if (!emp) {
                res.status(404).json({
                    message: 'Employee with id: ' + empId + ' not found'
                })
            } else {
                res.status(200).json(emp);
            }
        });
};
exports.createEmployment = (req, res, next) => {
    EmploymentRepository.createEmployment(req.body)
        .then(newobj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.updateEmployment = (req, res, next) => {
    const empId = req.params.emplId;
    EmploymentRepository.updateEmployment(empId, req.body)
        .then(result => {
            res.status(200).json({message: 'Employee updated!', emp: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        });
};
exports.deleteEmployment = (req, res, next) => {
    const empId = req.params.emplId;
    EmploymentRepository.deleteEmployment(empId)
        .then(result => {
            res.status(200).json({message: 'Removed employee', emp: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
