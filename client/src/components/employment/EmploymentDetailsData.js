import React, {Fragment} from "react";
import style from "../departments/Department.module.css";

function EmploymentDetailsData(props) {
    const empl = props.emplData;
    const data = new Date(empl.DataOd);
    return (
        <Fragment>
            <p>Data Od: {data.toLocaleDateString()} </p>
            <p>PhoneNumber: {empl.PhoneNumber} </p>
            <h2>Szczegóły Pracownika</h2>
            <table className={style['table-list']}>
                <thead>
                <tr>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                <tr key={empl.employee.emp_id}>
                    <td>{empl.employee.EmpName}</td>
                    <td>{empl.employee.LastName}</td>
                    <td>{empl.employee.Email}</td>
                </tr>
                </tbody>
            </table>
        </Fragment>
    )
}

export default EmploymentDetailsData;