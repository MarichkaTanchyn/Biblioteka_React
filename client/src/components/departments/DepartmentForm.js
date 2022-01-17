import React, {Component} from "react";
import formMode from "../../helpers/formHelper";

import {checkRequired, checkTextLengthRange} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import style from "./DepartmentForm.module.css";
import {Redirect} from "react-router-dom";
import {
    addDepartmentApiCall,
    getDepartmentByIdApiCall,
    updateDepartmentApiCall
} from "../../apiCalls/departmentApiCalls";

class DepartmentForm extends Component {

    constructor(props) {
        super(props);
        const paramsDeptId = props.match.params.deptId;
        const currentFormMode = paramsDeptId ? formMode.EDIT : formMode.NEW;

        this.state = {
            deptId: paramsDeptId,
            dept: {
                Name: '',
                NumOfWorkers: '',
                DateOfStart: '',
            },
            errors: {
                Name: '',
                NumOfWorkers: '',
                DateOfStart: '',
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchDepartmentDetails = () => {
        getDepartmentByIdApiCall(this.state.deptId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            dept: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }
    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT) {
            this.fetchDepartmentDetails();
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const dept = {...this.state.dept};
        dept[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            dept: dept,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane';
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'NumOfWorkers') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane';
            } else if (!checkTextLengthRange(fieldValue, 1, 1)) {
                errorMessage = 'Pole może zawierać tylko 1 liczbę'
            }
        }
        if (fieldName === 'DateOfStart') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane';
            }
        }
        return errorMessage;
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                dept = this.state.dept,
                currentFormMode = this.state.formMode;
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addDepartmentApiCall(dept);

            } else if (currentFormMode === formMode.EDIT) {
                console.log(dept);
                const deptId = this.state.deptId;
                promise = updateDepartmentApiCall(deptId, dept);
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = {...this.state.errors}
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({redirect: true})
                            }
                        },
                        (error) => {
                            this.setState({error})
                            console.log(error)
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const dept = this.state.dept;
        const errors = this.state.errors;
        for (const fieldName in dept) {
            const fieldValue = dept[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors;
    }

    render() {
        const {redirect} = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowy departament' : 'Pomyślnie zaktualizowano departaments'
            return (
                <Redirect to={{
                    pathname: "/departments/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowy departament' : 'Edycja departamentu'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main className={style.main}>
                <h2>{pageTitle}</h2>
                <form className={style.form} onSubmit={this.handleSubmit} action="/departments">
                    <FormInput
                        type="text"
                        label="Nazwa "
                        required
                        error={this.state.errors.Name}
                        name="Name"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.dept.Name}
                    />
                    <FormInput
                        type="number"
                        label="Max ilość pracowników "
                        required
                        error={this.state.errors.NumOfWorkers}
                        name="NumOfWorkers"
                        placeholder="1-9"
                        onChange={this.handleChange}
                        value={this.state.dept.NumOfWorkers}
                    />
                    <FormInput
                        type="date"
                        label="Data Startu "
                        required
                        error={this.state.errors.DateOfStart}
                        name="DateOfStart"
                        placeholder="12/12/2022"
                        onChange={this.handleChange}
                        value={this.state.dept.DateOfStart}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/departments"
                    />
                </form>
            </main>
        )
    }

}

export default DepartmentForm;