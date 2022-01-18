import React from "react";
import style from "./EmploymentList.module.css";
import {Link} from "react-router-dom";

const EmploymentListTableRow = (props) => {
    const employment = props.emplData;
    const date = new Date(employment.DataOd);
    return (
        <tr>
            <td>{employment.department.DeptName}</td>
            <td>{employment.employee.EmpName}</td>
            <td>{employment.employee.LastName}</td>
            <td>{employment.PhoneNumber}</td>
            <td>{date.toLocaleDateString()}</td>
            <td>
                <ul className={style['list-actions']}>
                    <li>
                        <Link to={`employments/details/${employment.id}`}
                              className={style['button-details']}>Szczegóły</Link>
                    </li>
                    <li>
                        <Link to={`/employments/edit/${employment.id}`} className={style['button-edit']}>Edytuj</Link>
                    </li>
                    <li>
                        <Link to={`/employments/delete/${employment.id}`} className={style['button-delete']}>Usuń</Link>
                    </li>
                </ul>
            </td>
        </tr>
    )
}

export default EmploymentListTableRow;