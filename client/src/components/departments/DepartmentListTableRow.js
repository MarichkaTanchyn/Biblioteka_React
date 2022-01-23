import React from "react";
import style from "./Department.module.css";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

const DepartmentListTableRow = (props) => {
    const {t} = props;
    const dept = props.deptData;
    const date = new Date(dept.DateOfStart);
    return (
        <tr>
            <td>{dept.Name}</td>
            <td>{dept.NumOfWorkers}</td>
            <td>{date.toLocaleDateString()}</td>
            <td>
                <ul className={style['list-actions']}>
                    <li>
                        <Link to={`departments/details/${dept.Dept_id}`}
                              className={style['button-details']}>{t('list.actions.details')}</Link>
                    </li>
                    <li>
                        <Link to={`/departments/edit/${dept.Dept_id}`}
                              className={style['button-edit']} >{t('list.actions.edit')}</Link>
                    </li>
                    <li>
                        <Link to={`/departments/delete/${dept.Dept_id}`}
                              className={style['button-delete']}>{t('list.actions.delete')}</Link>
                    </li>
                </ul>
            </td>
        </tr>
    )
}

export default withTranslation() (DepartmentListTableRow);