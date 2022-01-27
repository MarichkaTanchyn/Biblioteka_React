import React, {Component} from "react";
import formMode from "../../helpers/formHelper";
import {checkRequired, checkTextLengthRange} from "../../helpers/validationCommon";
import FormButtons from "../form/FormButtons";
import style from "./EmploymentForm.module.css";
import {Redirect} from "react-router-dom";
import {
    addEmploymentApiCall, getEmployeesAndDepartments, getEmploymentApiCall,
    getEmploymentByIdApiCall,
    updateEmploymentApiCall
} from "../../apiCalls/employmentApiCall";
import FormInput from "../form/FormInput";
import {withTranslation} from "react-i18next";

class EmploymentForm extends Component {

    constructor(props) {
        super(props);
        const paramsEmplId = props.match.params.emplId;
        const currentFormMode = paramsEmplId ? formMode.EDIT : formMode.NEW;
        this.state = {
            emplId: paramsEmplId,
            employment: {
                id: '',
                emp_id: '',
                dept_id: '',
                DataOd: '',
                PhoneNumber: '',
                employee: {
                    EmpName: '',
                    LastName: '',
                    Email: '',
                },
                department: {
                    DeptName: '',
                    NumOfWorkers: '',
                    DateOfStart: '',
                },
                employees: [],
                departments: []
            },

            errors: {
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
                    if (data.message != null) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            employment: data,
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
        this.fetchEmploymentDetails();
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const employment = {...this.state.employment};

        if (name === 'emp_id' || name === "id" || name === "dept_id") {
            employment[name] = parseInt(value);
        } else {
            employment[name] = value;
        }
        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            employment: employment,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'PhoneNumber') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane';
            } else if (!checkTextLengthRange(fieldValue, 8, 8)) {
                errorMessage = 'Numer telefonu ma zawierać 8 cyfr'
            }
        }
        if (fieldName === 'DataOd') {
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
                employment = this.state.employment,
                currentFormMode = this.state.formMode;
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addEmploymentApiCall(employment);

            } else if (currentFormMode === formMode.EDIT) {
                console.log(employment);
                const emplId = this.state.employment.id;
                promise = updateEmploymentApiCall(emplId, employment);
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
        const employment = this.state.employment;
        const errors = this.state.errors;
        for (const fieldName in employment) {
            const fieldValue = employment[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    }
    hasErrors = () => {
        const errors = this.state.errors;
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true;
            }
        }
        return false;
    }

    render() {
        const {t} = this.props;
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
        const pageTitle = this.state.formMode === formMode.NEW ? t('employment.form.add.pageTitle') : t('employment.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main className={style.main}>
                <h2>{pageTitle}</h2>
                <form className={style.form} onSubmit={this.handleSubmit} action="/employments">

                    {/*TODO: {t('')}*/}
                    <label htmlFor="emp_id">{t('employment.form.employee')}<abbr title="required" aria-label="required"
                                                           className={style.symbolRequired}>*</abbr></label>
                    <select name="emp_id" id="emp_id" defaultValue={this.state.employment.emp_id}
                            onChange={this.handleChange} required>
                        <option value="">Wybierz Pracownika</option>
                        {this.state.employment.employees.map(employee =>
                            (<option key={employee.Employee_id}
                                     value={employee.Employee_id}
                                     selected={employee.Employee_id === this.state.employment.emp_id}>{employee.Name} {employee.LastName}</option>)
                        )}
                    </select>
                    <label htmlFor="dept_id">{t('employment.form.department')}<abbr title="required" aria-label="required"
                                                              className={style.symbolRequired}>*</abbr></label>
                    <select name="dept_id" id="dept_id" defaultValue={this.state.employment.dept_id}
                            onChange={this.handleChange}  required>
                        <option value="">Wybierz Departament</option>
                        {this.state.employment.departments.map(department =>
                            (<option key={department.Dept_id}
                                     value={department.Dept_id}
                                     selected={department.Dept_id === this.state.employment.dept_id}>{department.Name}</option>)
                        )}
                    </select>

                    <FormInput
                        type="number"
                        label={t('employment.form.phoneNumber')}
                        required
                        name="PhoneNumber"
                        placeholder="627374828"
                        onChange={this.handleChange}
                        value={this.state.employment.PhoneNumber}
                    />
                    <FormInput
                        type="date"
                        label={t('employment.form.date')}
                        required
                        // error={this.state.errors.DateOfStart}
                        name="DataOd"
                        placeholder="dd/mm/yyyy"
                        onChange={this.handleChange}
                        value={this.state.employment.DataOd}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/employments"
                    />
                </form>
            </main>
        )
    }

}

export default withTranslation() (EmploymentForm);