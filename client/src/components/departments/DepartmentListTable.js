import React from "react";
import style from "./Department.module.css";
import DepartmentListTableRow from "./DepartmentListTableRow";
import {withTranslation} from "react-i18next";


const DepartmentListTable = (props) => {
    const {t} = props;
    const departments = props.deptList;
    console.log(departments);
    return (
        <table className={style['table-list']}>
            <thead>
            <tr>
                <th>{t('dept.fields.name')}</th>
                <th>{t('dept.fields.numberOfWorkers')}</th>
                <th>{t('dept.fields.dateOfCreate')}</th>
                <th>{t('dept.fields.actions')}</th>
            </tr>
            </thead>
            <tbody>
            {departments.length >0 && departments.map(dept =>
                <DepartmentListTableRow deptData={dept} key={dept.Dept_id}/>
            )}
            </tbody>
        </table>
    )
}
export default withTranslation() (DepartmentListTable);