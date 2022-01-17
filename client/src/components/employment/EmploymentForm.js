import React, {Component} from "react";
import formMode from "../../helpers/formHelper";

import {checkRequired, checkTextLengthRange} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import style from "./EmploymentForm.module.css";
import {Redirect} from "react-router-dom";
import {
    addEmploymentApiCall,
    getEmploymentByIdApiCall,
    updateEmploymentApiCall
} from "../../apiCalls/employmentApiCall";
import DepartmentForm from "../departments/DepartmentForm";
import DepartmentList from "../departments/DepartmentList";
import Select from "react-select/base";
import {getDepartmentApiCall} from "../../apiCalls/departmentApiCalls";

class EmploymentForm extends Component {

    constructor(props) {
        super(props);
        const paramsEmplId = props.match.params.emplId;
        const currentFormMode = paramsEmplId ? formMode.EDIT : formMode.NEW;

        this.state = {
            emplId: paramsEmplId,
            empl: {
                Employee_id: '',
                Dept_id: '',
                DataOd: '',
                PhoneNumber: '',

            },
            errors: {
                Employee_id: '',
                Dept_id: '',
                DataOd: '',
                PhoneNumber: '',

            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchEmploymentDetails = () => {
        getEmploymentByIdApiCall(this.state.emplId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            empl: data,
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
            this.fetchEmploymentDetails();
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const empl = {...this.state.empl};
        empl[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            empl: empl,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'PhoneNumber') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane';
            } else if (!checkTextLengthRange(fieldValue, 8, 8)) {
                errorMessage = 'Pole może zawierać 8 cyfr'
            }
        }
        if (fieldName === 'Data') {
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
                empl = this.state.empl,
                dept = this.state.department,
                currentFormMode = this.state.formMode;
            let
                promise,
                promiseDept,
                response;
            // promiseDept = getDepartmentApiCall(dept)
            if (currentFormMode === formMode.NEW) {
                promise = addEmploymentApiCall(empl);

            } else if (currentFormMode === formMode.EDIT) {
                console.log(empl);
                const emplId = this.state.emplId;
                promise = updateEmploymentApiCall(emplId, empl);
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
        const empl = this.state.empl;
        const errors = this.state.errors;
        for (const fieldName in empl) {
            const fieldValue = empl[fieldName];
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
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowe zatrudnienie' : 'Pomyślnie zaktualizowano zatrudnienie'
            return (
                <Redirect to={{
                    pathname: "/employments/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowe zatrudnienie' : 'Edycja zatrudnienia'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main className={style.main}>
                <h2>{pageTitle}</h2>
                <form className={style.form} onSubmit={this.handleSubmit} action="/employments">


                    <Select aria-label={this.state.department.DeptName}
                            value={this.state.department.Dept_id}
                            onChange={this.handleChange}
                    />

                    <FormInput
                        type="select"
                        label={this.state.department.DeptName}
                        required
                        // error={this.state.errors.Name}
                        name="DeptName"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.department.Dept_id}
                    />
                    {/*<FormInput*/}
                    {/*    type="select"*/}
                    {/*    label="Pracownik "*/}
                    {/*    required*/}
                    {/*    error={this.state.errors.NumOfWorkers}*/}
                    {/*    name="NumOfWorkers"*/}
                    {/*    placeholder="1-9"*/}
                    {/*    onChange={this.handleChange}*/}
                    {/*    value={this.state.dept.NumOfWorkers}*/}
                    {/*/>*/}
                    {/*<FormInput*/}
                    {/*    type="number"*/}
                    {/*    label="Numer Telefonu "*/}
                    {/*    required*/}
                    {/*    error={this.state.errors.DateOfStart}*/}
                    {/*    name="PhoneNumber"*/}
                    {/*    placeholder="627374828"*/}
                    {/*    onChange={this.handleChange}*/}
                    {/*    value={this.state.dept.DateOfStart}*/}
                    {/*/>*/}
                    {/*<FormInput*/}
                    {/*    type="date"*/}
                    {/*    label="Email "*/}
                    {/*    required*/}
                    {/*    error={this.state.errors.DateOfStart}*/}
                    {/*    name="DateOfStart"*/}
                    {/*    placeholder="np. nazwa@domena.pl"*/}
                    {/*    onChange={this.handleChange}*/}
                    {/*    value={this.state.dept.DateOfStart}*/}
                    {/*/>*/}
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

export default EmploymentForm;