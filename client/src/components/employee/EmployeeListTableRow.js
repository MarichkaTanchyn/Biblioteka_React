import React from "react";
import style from "./EmployeeList.module.css";
import {Link} from "react-router-dom";

const EmployeeListTableRow = (props) => {

    const emp = props.empData;
    return (
        <tr>
            <td>{emp.Name}</td>
            <td>{emp.LastName}</td>
            <td>{emp.Email}</td>
            <td>
                <ul className={style['list-actions']}>
                    <li>
                        <Link to={`employees/details/${emp.Employee_id}`} className={style['button-details']}>Szczegóły</Link>
                    </li>
                    <li>
                        <Link to={`/employees/edit/${emp.Employee_id}`} className={style['button-edit']} >Edytuj</Link>
                    </li>
                    <li>
                        <Link to={`employees/delete/${emp.Employee_id}`} className={style['button-delete']}>Usuń</Link>
                    </li>
                </ul>
            </td>
        </tr>
    )
}

export default EmployeeListTableRow;