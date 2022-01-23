import React from "react";
import style from "./EmployeeList.module.css";
import EmployeeListTableRow from "./EmployeeListTableRow";
import {withTranslation} from "react-i18next";

const EmployeeListTable = (props) => {
    const { t } = props
    const employees = props.empList;
    console.log(employees);
    return (
        <table className={style['table-list']}>
            <thead>
            <tr>
                <th>{t('emp.fields.firstName')}</th>
                <th>{t('emp.fields.lastName')}</th>
                <th>{t('emp.fields.email')}</th>
                <th>{t('emp.fields.actions')}</th>
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
export default withTranslation() (EmployeeListTable);