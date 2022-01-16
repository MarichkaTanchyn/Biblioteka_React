const dbHandler = require('../../util/db');
const empSchema = require('../../model/joi/Employee');
const authUtils = require('../../util/authUtils')

exports.getEmployees = async () => {
    try {
        return await dbHandler.query('SELECT * FROM Employee');
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


exports.getEmployeeById = async (empId) => {
    try {
        const query =
            "SELECT e.Employee_id as id, e.Name as EmpName, e.LastName, e.Email, e.Password, empl.Employment_id as empl_id, " +
            "empl.PhoneNumber, empl.DataOd, empl.Dept_id as dept_id, dept.Name as DeptName, dept.NumOfWorkers, dept.DateOfStart " +
            "FROM Employee e " +
            "LEFT JOIN Employment empl on empl.Employee_id = e.Employee_id " +
            "LEFT JOIN Department dept on empl.Dept_id = dept.Dept_id " +
            "WHERE e.Employee_id = ?";

        const results = await dbHandler.query(query, [empId]);

        const firstRow = results[0];
        if (!firstRow) {
            return {};
        }

        const emp = {
            empId: parseInt(firstRow.id),
            Name: firstRow.EmpName,
            LastName: firstRow.LastName,
            Email: firstRow.Email,
            Password: firstRow.Password,
            employments: []
        }

        for (let i = 0; i < results.length; i++) {
            const row = results[i];
            if (row.empl_id) {
                const employment = {
                    id: row.empl_id,
                    PhoneNumber: row.PhoneNumber,
                    DataOd: row.DataOd,
                    department: {
                        _id: row.dept_id,
                        DeptName: row.DeptName,
                        NumOfWorkers: row.NumOfWorkers,
                        DateOfStart: row.DateOfStart
                    }
                };
                emp.employments.push(employment);
            }
        }
        return emp;
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

exports.createEmployee = async (newEmployeeData) => {
    console.log(newEmployeeData);
    try {
        // const vRes = empSchema.validate(newEmployeeData, {abortEarly: false});
        // if (vRes.error) {
        //     return Promise.reject(vRes.error);
        // }

        // const emailError = await checkEmailUnique(newEmployeeData.Email);
        // if (emailError) {
        //     return Promise.reject(emailError);
        // }

        const EmpName = newEmployeeData.Name;
        const LastName = newEmployeeData.LastName;
        const Email = newEmployeeData.Email;
        const Salt = authUtils.genSaltSync(8);
        const Password = authUtils.hashPassword(newEmployeeData.Password, Salt);
        const sql = "INSERT INTO Employee (Name, LastName, Email, Password) VALUES (?,?,?,?);"
        return dbHandler.execute(sql, [EmpName, LastName, Email, Password]);

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


exports.updateEmployee = async (employeeId, employeeDate) => {
    try {
        const vRes = empSchema.validate(employeeDate, {abortEarly: false});

        if (vRes.error) {
            return Promise.reject(vRes.error);
        }

        const EmpName = employeeDate.Name;
        const LastName = employeeDate.LastName;
        const Email = employeeDate.Email;
        const sql = "UPDATE Employee SET Name = ?, LastName = ?, Email = ? WHERE Employee_id = ?;"
        return await dbHandler.execute(sql, [EmpName, LastName, Email, employeeId]);

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

exports.deleteEmployee = async (employeeId) => {
    try {
        await dbHandler.execute('DELETE From Employment WHERE Employee_id = ?', [employeeId]);
        return await dbHandler.execute("DELETE FROM Employee WHERE Employee_id = ?", [employeeId]);

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
exports.findByEmail = async (email) => {
    try {
        const sql = 'SELECT * FROM Employee where Email = ?';
        const result =  await dbHandler.execute(sql, [email]);
        return result[0];
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

checkEmailUnique = async (email) => {
    const sql = 'SELECT COUNT(*) as c FROM Employee where Email = ?';
    const results = await dbHandler.query(sql, [email]);

    const count = results[0].c;
    let err;
    if (count > 0) {
        err = {
            details: [{
                message: 'Podany adres email jest już używany',
                path: 'email',
                type: 'email error'
            }]
        };
    }
    return err;
}