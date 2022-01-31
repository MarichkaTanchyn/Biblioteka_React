import React, {Component} from "react";
import formMode from "../../helpers/formHelper";
import {addEmployeeApiCall, getEmployeeByIdApiCall, updateEmployeeApiCall} from "../../apiCalls/employeeApiCalls";
import {checkEmail, checkRequired, checkTextLengthRange} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import style from "./EmployeeForm.module.css";
import {Redirect} from "react-router-dom";
import {withTranslation} from "react-i18next";

class EmployeeForm extends Component {
    constructor(props) {
        super(props);

        const paramsEmpId = props.match.params.empId;
        const currentFormMode = paramsEmpId ? formMode.EDIT : formMode.NEW;

        this.state = {
            empId: paramsEmpId,
            emp: {
                Name: '',
                LastName: '',
                Email: '',
                Password: ''
            },
            errors: {
                Name: '',
                LastName: '',
                Email: '',
                Password: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchEmployeeDetails = () => {
        getEmployeeByIdApiCall(this.state.empId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            emp: data,
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
            this.fetchEmployeeDetails();
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const emp = {...this.state.emp};
        emp[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            emp: emp,
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
        if (fieldName === 'LastName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane';
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'Email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane';
            } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
                errorMessage = 'Pole powinno zawierać od 5 do 60 znaków'
            } else if (!checkEmail(fieldValue)) {
                errorMessage = 'Pole powinno zawierać prawidłowy adres email';
            }

        }

        if (fieldName === 'password' && this.state.formMode === formMode.NEW) {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Field is required";
            }
        }
        return errorMessage;
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                emp = this.state.emp,
                currentFormMode = this.state.formMode;
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addEmployeeApiCall(emp);

            } else if (currentFormMode === formMode.EDIT) {
                console.log(emp);
                const empId = this.state.empId;
                promise = updateEmployeeApiCall(empId, emp);
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
        const emp = this.state.emp;
        const errors = this.state.errors;
        for (const fieldName in emp) {
            const fieldValue = emp[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors;
    }

    render() {
        const {t} = this.props;
        const {redirect} = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowego pracownika' : 'Pomyślnie zaktualizowano nowego pracownika'
            return (
                <Redirect to={{
                    pathname: "/employees/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('emp.form.add.pageTitle') : t('emp.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main className={style.main}>
                <h2>{pageTitle}</h2>
                <form className={style.form} onSubmit={this.handleSubmit} action="/employees">
                    <FormInput
                        type="text"
                        label={t('emp.fields.firstName')}
                        required
                        error={this.state.errors.Name}
                        name="Name"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.emp.Name}
                    />
                    <FormInput
                        type="text"
                        label={t('emp.fields.lastName')}
                        required
                        error={this.state.errors.LastName}
                        name="LastName"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.emp.LastName}
                    />
                    <FormInput
                        type="text"
                        label={t('emp.fields.email')}
                        required
                        error={this.state.errors.email}
                        name="Email"
                        placeholder="np. nazwa@domena.pl"
                        onChange={this.handleChange}
                        value={this.state.emp.Email}
                    />
                    <FormInput
                        type="password"
                        label={t('emp.fields.password')}
                        required
                        error={this.state.errors.password}
                        name="Password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={this.state.emp.Password}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/employees"
                    />
                </form>
            </main>
        )
    }

}

export default withTranslation()(EmployeeForm);