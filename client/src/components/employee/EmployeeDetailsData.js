import React, {Fragment} from "react";
import style from "../departments/Department.module.css";

function EmployeeDetailsData(props) {
    const emp = props.empData;
    // const data = new Date()
    return (
        <Fragment>
            <p>Imię: {emp.Name} </p>
            <p>Nazwisko: {emp.LastName} </p>
            <p>E-mail: {emp.Email} </p>
            <h2>Szczegóły zatrudnienia</h2>
            <table className={style['table-list']}>
                <thead>
                <tr>
                    <th>Departament</th>
                    <th>Numer Telefonu</th>
                    <th>Data Od</th>
                </tr>
                </thead>
                <tbody>
                {emp.employments.map(
                    employment =>
                        <tr key={employment.id}>
                            <td>{employment.department.DeptName}</td>
                            <td>{employment.PhoneNumber}</td>
                            <td>{employment.DataOd}</td>
                            {/*<td>{(employment.DataOd).toLocaleDateString()}</td>*/}
                        </tr>
                )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default EmployeeDetailsData;