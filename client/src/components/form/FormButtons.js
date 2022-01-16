import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import style from "../employee/EmployeeForm.module.css"
function FormButtons(props) {
    const submitButtonLabel = props.formMode === formMode.NEW ? 'Dodaj' : 'Edytuj';

    return (
        <>
            <input className={style.button} type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className={`${style.button} ${style['a-in-button']} `} >Anuluj</Link>
        </>
    )
}

export default FormButtons;