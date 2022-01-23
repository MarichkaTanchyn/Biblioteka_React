import React from "react";
import style from "./EmploymentList.module.css"
import EmploymentListTableRow from "./EmploymentListTableRow";
import {withTranslation} from "react-i18next";


const EmploymentListTable = (props) => {
    const {t} = props;
    const employments = props.emplList;

    return (
        <table className={style['table-list']}>
            <thead>
            <tr>
                <th>{t('employment.fields.department')}</th>
                <th>{t('employment.fields.firstName')}</th>
                <th>{t('employment.fields.lastName')}</th>
                <th>{t('employment.fields.phoneNumber')}</th>
                <th>{t('employment.fields.dateOfEmployment')}</th>
                <th>{t('employment.fields.actions')}</th>
            </tr>
            </thead>
            <tbody>
            {employments.length > 0 && employments.map(empl =>
                <EmploymentListTableRow emplData={empl} key={empl.id}/>
            )}
            </tbody>
        </table>
    )
}
export default withTranslation() (EmploymentListTable);