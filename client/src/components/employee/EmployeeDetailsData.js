import React, {Fragment} from "react";
import style from "../departments/Department.module.css";
import {withTranslation} from "react-i18next";

function EmployeeDetailsData(props) {
    const { t } = props;
    const emp = props.empData;
    let data = new Date();
    {emp.employments.map(
        employment =>
        data = employment.DataOd
    )}
    return (
        <Fragment>
            <p>{t('emp.list.firstName')} {emp.Name} </p>
            <p>{t('emp.list.lastName')} {emp.LastName} </p>
            <p>{t('emp.list.email')} {emp.Email} </p>
            <h2>{t('emp.list.details')}</h2>
            <table className={style['table-list']}>
                <thead>
                <tr>
                    <th>{t('emp.form.edit.department')}</th>
                    <th>{t('emp.form.edit.phoneNumber')}</th>
                    <th>{t('emp.form.edit.dateOfEmployment')}</th>

                </tr>
                </thead>
                <tbody>
                {emp.employments.map(
                    employment =>
                        <tr key={employment.id}>
                            <td>{employment.department.DeptName}</td>
                            <td>{employment.PhoneNumber}</td>

                            <td>{new Date(data).toLocaleDateString()}</td>

                        </tr>
                )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default withTranslation() (EmployeeDetailsData);