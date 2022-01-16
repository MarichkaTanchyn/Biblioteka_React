const dbHandler = require('../../util/db');
const deptSchema = require("../../model/joi/Department");

exports.getDepartments = async () => {
    try {
        return await dbHandler.query('SELECT * FROM Department');
    } catch (err) {
        return Promise.reject({
            details: [{
                message: 'Something went wrong with database query',
                path: 'DB',
                type: 'Database Error'
            }]
        });
    }
};


exports.getDepartmentsWithEmployees = async () => {
    try {
        const query =
            "SELECT dept.Dept_id as dept_id, dept.Name as DeptName, dept.NumOfWorkers, dept.DateOfStart, " +
            "empl.Employment_id as empl_id, empl.PhoneNumber, empl.DataOd, dept.NumOfWorkers, empl.Employee_id as emp_id, " +
            "e.Name as EmpName, e.LastName, e.Email " +
            "FROM Department dept " +
            "Left join Employment empl on empl.Dept_id = dept.Dept_id " +
            "Left join Employee e on empl.Employee_id = e.Employee_id";
        const results = await dbHandler.query(query);

        const departments = [];
        for (let i = 0; i < results.length; i++) {
            const row = results[i];
            const department = {
                id: row.dept_id,
                DeptName: row.DeptName,
                NumOfWorkers: row.NumOfWorkers,
                DateOfStart: row.DateOfStart,
                employment: {
                    id: row.empl_id,
                    DataOd: row.DataOd,
                    PhoneNumber: row.PhoneNumber
                },
                employee: {
                    emp_id: row.emp_id,
                    EmpName: row.EmpName,
                    LastName: row.LastName,
                    Email: row.Email
                }
            };
            departments.push(department);
        }
        return departments;
    } catch (err) {
        return Promise.reject({
            details: [{
                message: 'Something went wrong with database query',
                path: 'DB',
                type: 'Database Error'
            }]
        });
    }
};

exports.getDepartmentById = async (deptId) => {
    try {
        const query =
            "SELECT dept.Dept_id as dept_id, dept.Name as DeptName, dept.NumOfWorkers, dept.DateOfStart, " +
            "empl.Employment_id as empl_id, empl.PhoneNumber, empl.DataOd, dept.NumOfWorkers, empl.Employee_id as emp_id, " +
            "e.Name as EmpName, e.LastName, e.Email FROM Department dept left join Employment empl on empl.Dept_id = dept.Dept_id left join Employee e on empl.Employee_id = e.Employee_id where dept.Dept_id = ?";
        const results = await dbHandler.query(query, [deptId]);

        const firstrow = results[0];
        if (!firstrow) {
            return {};
        }
        const dept = {
            id: parseInt(deptId),
            DeptName: firstrow.DeptName,
            NumOfWorkers: firstrow.NumOfWorkers,
            DateOfStart: firstrow.DateOfStart,
            employments: []
        }
        for (let i = 0; i < results[0].length; i++) {
            const row = results[i];
            if (row.empl_id != null) {
                const employment = {
                    id: row.empl_id,
                    DataOd: row.DataOd,
                    PhoneNumber: row.PhoneNumber,
                    employee: {
                        emp_id: row.emp_id,
                        EmpName: row.EmpName,
                        LastName: row.LastName,
                        Email: row.Email
                    }
                };
                dept.employments.push(employment);
            }
        }
        return dept;
    } catch (err) {
        return Promise.reject({
            details: [{
                message: 'Something went wrong with database query',
                path: 'DB',
                type: 'Database Error'
            }]
        });
    }
};

exports.createDepartment = async (newDepartmentData) => {
    try {

        const vRes = deptSchema.validate(newDepartmentData, {abortEarly: false});
        if (vRes.error) {
            return Promise.reject(vRes.error);
        }
        const deptName = newDepartmentData.name;
        const numOfWorkers = newDepartmentData.amountofEmp;
        const DateOfStart = newDepartmentData.dateOfStart;
        const sql = "INSERT INTO Department (Name, NumOfWorkers, DateOfStart) VALUES (?,?,?);"
        return await dbHandler.execute(sql, [deptName, numOfWorkers, DateOfStart]);
    } catch (err) {
        return Promise.reject({
            details: [{
                message: 'Something went wrong with database query',
                path: 'DB',
                type: 'Database Error'
            }]
        });
    }
    ;
}

exports.updateDepartment = async (deptId, deptData) => {
    try {
        const vRes = deptSchema.validate(deptData, {abortEarly: false});
        if (vRes.error) {
            return Promise.reject(vRes.error);
        }
        const deptName = deptData.name;
        const numOfWorkers = deptData.amountofEmp;
        const dateOfStart = deptData.dateOfStart;

        const sql = "UPDATE Department SET Name = ?, numOfWorkers = ?, DateOfStart = ? WHERE Dept_id = ?;"
        return await dbHandler.execute(sql, [deptName, numOfWorkers, dateOfStart, deptId]);
    } catch (err) {
        return Promise.reject({
            details: [{
                message: 'Something went wrong with database query',
                path: 'DB',
                type: 'Database Error'
            }]
        });
    }
}
exports.deleteDepartment = async (deptId) => {
    try {
        await dbHandler.execute('DELETE From Employment WHERE Dept_id = ?', [deptId]);
        return await dbHandler.execute("DELETE FROM Department WHERE Dept_id = ?", [deptId]);
    } catch (err) {
        return Promise.reject({
            details: [{
                message: 'Something went wrong with database query',
                path: 'DB',
                type: 'Database Error'
            }]
        });
    }
}