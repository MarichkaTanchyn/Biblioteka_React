const EmploymentRepository = require('../repository/mysql2/EmploymentRepository');
const EmployeeRepository = require('../repository/mysql2/EmployeeRepository');
const DepartmentRepository = require('../repository/mysql2/DepartmentRepository');

exports.getEmployments = (reg, res, next) => {
    EmploymentRepository.getEmployments()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

exports.getEmployeesAndDepartments = (req, res, next) => {
    EmploymentRepository.getEmployeesAndDepartments()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

exports.getEmploymentById = (req, res, next) => {
    const emplId = req.params.emplId;
    let emp, dept;
    console.log(emplId);

    EmployeeRepository.getEmployees().then(emps => {
        emp = emps
        return DepartmentRepository.getDepartments()
    }).then(
        depts => {
            dept = depts
            return EmploymentRepository.getEmploymentById(emplId)
        })
        .then(empl => {
            if (!empl) {
                res.status(404).json({
                    message: 'Employee with id: ' + emplId + ' not found'
                })
            } else {
                empl.employees = emp;
                empl.departments = dept;
                res.status(200).json(empl);
            }
        });
}
;
exports.createEmployment = (req, res, next) => {
    EmploymentRepository.createEmployment(req.body)
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
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
