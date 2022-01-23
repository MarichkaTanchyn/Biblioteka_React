import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import style from "../employee/EmployeeForm.module.css"
import {withTranslation} from "react-i18next";
function FormButtons(props) {
    const {t} = props
    const submitButtonLabel = props.formMode === formMode.NEW ? t('form.actions.add') : t('form.actions.edit');

    return (
        <>
            <input className={style.button} type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className={`${style.button} ${style['a-in-button']} `} >{t('form.actions.cancel')}</Link>
        </>
    )
}

export default withTranslation() (FormButtons);