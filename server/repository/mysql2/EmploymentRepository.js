const dbHandler = require('../../util/db');
const emplSchema = require("../../model/joi/Employment");
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

exports.getEmployeesAndDepartments = async () => {
    try {
        let query = "SELECT * FROM Employee";
        const employees_query = await dbHandler.query(query);

        query = "SELECT * FROM Department";
        const department_query = await dbHandler.query(query);
        const data = {
            employment: {
                id: '',
                emp_id: '',
                dept_id: '',
                DataOd: '',
                PhoneNumber: '',
                employee: {
                    EmpName: '',
                    LastName: '',
                    Email: ''
                },
                department: {
                    DeptName: '',
                    NumOfWorkers: '',
                    DateOfStart: ''
                }

            },
            employees: employees_query,
            departments: department_query
        };
        return data;
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

exports.getEmploymentById = async (employmentId) => {
    try {
        let query =
            "SELECT empl.Employment_id as empl_id, empl.DataOd," +
            " empl.PhoneNumber, dept.Name as DeptName, dept.NumOfWorkers, " +
            "dept.DateOfStart, empl.Dept_id as dept_id, " +
            "empl.Employee_id as emp_id,e.Name as EmpName, " +
            "e.LastName, e.Email FROM Employment empl " +
            "LEFT JOIN Department dept on dept.Dept_id = empl.Dept_id " +
            "LEFT JOIN Employee e on e.Employee_id = empl.Employee_id " +
            "WHERE empl.Employment_id = ?";
        const employment_query = await dbHandler.query(query, [employmentId]);

        query = "SELECT * FROM Employee";
        const employees_query = await dbHandler.query(query);

        query = "SELECT * FROM Department";
        const department_query = await dbHandler.query(query);

        const row = employment_query[0];
        if (!row) {
            return {

                id: 0,
                emp_id: 0,
                dept_id: 0,
                DataOd: '00/00/0000',
                PhoneNumber: '12345678',
                employee: {
                    EmpName: 'Name',
                    LastName: 'LastName',
                    Email: 'Email'
                },
                department: {
                    DeptName: 'Name',
                    NumOfWorkers: 0,
                    DateOfStart: '00/00/0000'
                },
                employees: [],
                departments: []
            };
        }

        const data = {
            id: parseInt(employmentId),
            emp_id: row.emp_id,
            dept_id: row.dept_id,
            DataOd: row.DataOd,
            PhoneNumber: row.PhoneNumber,
            employee: {
                EmpName: row.EmpName,
                LastName: row.LastName,
                Email: row.Email
            },
            department: {
                DeptName: row.DeptName,
                NumOfWorkers: row.NumOfWorkers,
                DateOfStart: row.DateOfStart
            },
            employees: [],
            departments: []

        }
        return data;
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

exports.createEmployment = async (newEmploymentData) => {
    try {
        const vRes = emplSchema.validate(newEmploymentData[0], {abortEarly: false});
        if (vRes.error) {
            console.log(newEmploymentData);
            return Promise.reject(vRes.error);
        }
        const emp_Id = newEmploymentData.emp_id;
        const dept_Id = newEmploymentData.dept_id;
        const dataOd = newEmploymentData.DataOd;
        const phoneNumber = newEmploymentData.PhoneNumber;
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
        console.log(emplDate);
        const vRes = emplSchema.validate(emplDate[0], {abortEarly: false});
        if (vRes.error) {
            return Promise.reject(vRes.error);
        }
        const emp_Id = emplDate.emp_id;
        const dept_Id = emplDate.dept_id;
        const dataOd = emplDate.DataOd;
        const phoneNumber = emplDate.PhoneNumber;
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