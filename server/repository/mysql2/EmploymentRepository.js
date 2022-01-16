const dbHandler = require('../../util/db');
// const emplSchema = require("../../model/joi/Employment");


exports.getEmployments = async () => {
    try {
        const query =
            "SELECT empl.Employment_id as empl_id, empl.DataOd, empl.PhoneNumber," +
            "dept.Name as DeptName, dept.NumOfWorkers, dept.DateOfStart, " +
            "empl.Dept_id as dept_id, empl.Employee_id as emp_id,e.Name as EmpName," +
            "e.LastName, e.Email FROM Employment empl " +
            "LEFT JOIN Department dept on dept.Dept_id = empl.Dept_id " +
            "LEFT JOIN Employee e on e.Employee_id = empl.Employee_id";
        const results = await dbHandler.query(query);

        const employments = [];
        for (let i = 0; i < results.length; i++) {
            const row = results[i];
            const employment = {
                id: row.empl_id,
                DataOd: row.DataOd,
                PhoneNumber: row.PhoneNumber,
                employee: {
                    emp_id: row.emp_id,
                    EmpName: row.EmpName,
                    LastName: row.LastName,
                    Email: row.Email
                },
                department: {
                    id: row.dept_id,
                    DeptName: row.DeptName,
                    NumOfWorkers: row.NumOfWorkers,
                    DateOfStart: row.DateOfStart
                }
            };

            employments.push(employment);
        }
        return employments;

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

exports.getEmploymentById = async (employmentId) => {
    try {
        const query =
            "SELECT empl.Employment_id as empl_id, empl.DataOd," +
            " empl.PhoneNumber, dept.Name as DeptName, dept.NumOfWorkers, " +
            "dept.DateOfStart, empl.Dept_id as dept_id, " +
            "empl.Employee_id as emp_id,e.Name as EmpName, " +
            "e.LastName, e.Email FROM Employment empl " +
            "LEFT JOIN Department dept on dept.Dept_id = empl.Dept_id " +
            "LEFT JOIN Employee e on e.Employee_id = empl.Employee_id " +
            "WHERE empl.Employment_id = ?";
        const results = await dbHandler.query(query, [employmentId]);

        const row = results[0];
        if (!row) {
            return {};
        }
        const empl = {
            id: parseInt(employmentId),
            DataOd: row.DataOd,
            PhoneNumber: row.PhoneNumber,
            employee: {
                emp_id: row.emp_id,
                EmpName: row.EmpName,
                LastName: row.LastName,
                Email: row.Email
            },
            department: {
                id: row.dept_id,
                DeptName: row.DeptName,
                NumOfWorkers: row.NumOfWorkers,
                DateOfStart: row.DateOfStart
            }
        }

        return empl;
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
;

exports.createEmployment = async (newEmploymentData) => {
    try {
        // const vRes = emplSchema.validate(newEmploymentData, {abortEarly: false});
        // if (vRes.error) {
        //     console.log(newEmploymentData.telNum);
        //     return Promise.reject(vRes.error);
        // }
        const emp_Id = newEmploymentData.emp_Id;
        const dept_Id = newEmploymentData.deptId;
        const dataOd = newEmploymentData.DataOd;
        const phoneNumber = newEmploymentData.telNum;
        const sql = "SELECT COUNT(*) as count FROM Employment WHERE Employee_id = ? And Dept_id = ?;";
        const count = await dbHandler.query(sql, [emp_Id, dept_Id]);
        if (count[0]['count'] > 0) {
            throw Error();
        }
        return dbHandler.execute("INSERT INTO Employment (Employee_id, Dept_id ,DataOd, PhoneNumber) VALUES (?,?,?,?);", [emp_Id, dept_Id, dataOd, phoneNumber]);

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

exports.updateEmployment = async (emplId, emplDate) => {
    try {
        // const vRes = emplSchema.validate(emplDate, {abortEarly: false});
        // if (vRes.error) {
        //     return Promise.reject(vRes.error);
        // }
        const emp_Id = emplDate.emp_Id;
        const dept_Id = emplDate.deptId;
        const dataOd = emplDate.DataOd;
        const phoneNumber = emplDate.telNum;
        return await dbHandler.execute(
            "UPDATE Employment SET Employee_id = ?, Dept_id = ?, DataOd = ?, PhoneNumber = ? WHERE Employment_id = ?;",
            [emp_Id, dept_Id, dataOd, phoneNumber, emplId]);
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
exports.deleteEmployment = async (emplId) => {
    try {
        return await dbHandler.execute("DELETE FROM Employment WHERE Employment_id = ?", [emplId]);
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