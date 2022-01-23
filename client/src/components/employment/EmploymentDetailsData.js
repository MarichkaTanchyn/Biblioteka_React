import React, {Fragment} from "react";
import style from "../departments/Department.module.css";
import {withTranslation} from "react-i18next";

function EmploymentDetailsData(props) {
    const {t} = props;
    const empl = props.emplData;
    const data = new Date(empl.DataOd);
    return (
        <Fragment>
            <p>{t('employment.form.date')} {data.toLocaleDateString()} </p>
            <p>{t('employment.form.phoneNumber')} {empl.PhoneNumber} </p>
            <h2>{t('employment.form.detailsEmp')}</h2>
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

export default withTranslation() (EmploymentDetailsData);