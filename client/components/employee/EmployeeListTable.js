import React from "react";
import style from "./EmployeeList.module.css";
import EmployeeListTableRow from "./EmployeeListTableRow";

const EmployeeListTable = (props) => {
    const employees = props.empList;
    console.log(employees);
    return (
        <table className={style['table-list']}>
            <thead>
            <tr>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>E-mail</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {employees.length >0 && employees.map(emp =>
                <EmployeeListTableRow empData={emp} key={emp.Employee_id}/>
            )}
            </tbody>
        </table>
    )
}
export default EmployeeListTable;