import React from "react";

function FormInput (props) {
    const className = props.error === '' ? '' : 'error-input';
    const name = props.name;
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1);
    return (
        <>
        <label htmlFor={props.name}>
            {props.label}:
            {props.required && <abbr title={"required"} aria-label={"required"} >*</abbr>}
        </label>
            <input
                type={props.type}
                className={className}
                name={props.name}
                id={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}/>
            <span id={errorSpanId} className="erros-text">{props.error}</span>
        </>
    )
}

export default FormInput;