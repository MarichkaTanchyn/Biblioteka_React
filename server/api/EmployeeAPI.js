const EmployeeRepository = require('../repository/mysql2/EmployeeRepository');

exports.getEmployees = (reg, res, next) => {
    EmployeeRepository.getEmployees()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

exports.getEmployeeById = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.getEmployeeById(empId)
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
exports.createEmployee = (req, res, next) => {
    EmployeeRepository.createEmployee(req.body)
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
exports.updateEmployee = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.updateEmployee(empId, req.body)
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
exports.deleteEmployee = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.deleteEmployee(empId)
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
