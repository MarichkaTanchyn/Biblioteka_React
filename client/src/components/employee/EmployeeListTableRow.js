import React from "react";
import style from "./EmployeeList.module.css";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

const EmployeeListTableRow = (props) => {
    const { t } = props;
    const emp = props.empData;
    return (
        <tr>
            <td>{emp.Name}</td>
            <td>{emp.LastName}</td>
            <td>{emp.Email}</td>
            <td>
                <ul className={style['list-actions']}>
                    <li>
                        <Link to={`employees/details/${emp.Employee_id}`} className={style['button-details']}>{t('list.actions.details')}</Link>
                    </li>
                    <li>
                        <Link to={`/employees/edit/${emp.Employee_id}`} className={style['button-edit']} >{t('list.actions.edit')}</Link>
                    </li>
                    <li>
                        <Link to={`/employees/delete/${emp.Employee_id}`} className={style['button-delete']}>{t('list.actions.delete')}</Link>
                    </li>
                </ul>
            </td>
        </tr>
    )
}

export default withTranslation() (EmployeeListTableRow);