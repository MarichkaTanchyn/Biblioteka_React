const DeptRepository = require('../repository/mysql2/DepartmentRepository');

exports.getDepartments = (reg, res, next) => {
    DeptRepository.getDepartments()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

exports.getDepartmentsById = (req, res, next) => {
    const empId = req.params.deptId;
    DeptRepository.getDepartmentById(empId)
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
exports.createDepartment = (req, res, next) => {

    DeptRepository.createDepartment(req.body)
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
exports.updateDepartment = (req, res, next) => {
    const empId = req.params.deptId;
    DeptRepository.updateDepartment(empId, req.body)
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
exports.deleteDepartment = (req, res, next) => {
    const empId = req.params.deptId;
    DeptRepository.deleteDepartment(empId)
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
