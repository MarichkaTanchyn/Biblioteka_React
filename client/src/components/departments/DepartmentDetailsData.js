import React, {Fragment} from "react";
import "./Department.module.css";
import {withTranslation} from "react-i18next";

function DepartmentDetailsData(props) {
    const {t} = props;
    const dept = props.deptData;
    const data = new Date(dept.DateOfStart);
    return (
        <Fragment>
            <p>{t('dept.form.name')} {dept.Name} </p>
            <p>{t('dept.form.dateOfCreate')} {data.toLocaleDateString()} </p>
            <p>{t('dept.form.numOfWorkers')} {dept.NumOfWorkers} </p>
        </Fragment>
    )
}

export default withTranslation() (DepartmentDetailsData);