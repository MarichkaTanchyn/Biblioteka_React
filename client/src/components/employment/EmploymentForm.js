import React, {Component} from "react";
import formMode from "../../helpers/formHelper";
import {checkRequired, checkTextLengthRange} from "../../helpers/validationCommon";
import FormButtons from "../form/FormButtons";
import style from "./EmploymentForm.module.css";
import {Redirect} from "react-router-dom";
import {
    addEmploymentApiCall,
    getEmploymentByIdApiCall,
    updateEmploymentApiCall
} from "../../apiCalls/employmentApiCall";
import {getDepartmentApiCall} from "../../apiCalls/departmentApiCalls";
import {getEmployeeApiCall} from "../../apiCalls/employeeApiCalls";

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
            emp: [],
            dept: [],
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

    fetchEmployeeList = () => {
        getEmployeeApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        employees: data
                    });
                },
                (error) => {

                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }
    fetchDepartmentList = () => {
        getDepartmentApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    console.log("fetch", data);
                    this.setState({
                        isLoaded: true,
                        dept: data
                    });
                },
                (error) => {

                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
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
        this.fetchDepartmentList();
        this.fetchEmployeeList();
        if (currentFormMode === formMode.EDIT) {
            this.fetchEmploymentDetails();
        }
        console.log(this.state.dept);
        console.log(this.state.emp);
    }


    handleChange = (event) => {
        const {name, value} = event.target;
        const empl = {...this.state.empl};
        const dept = {...this.state.dept};
        const emp = {...this.state.emp}
        empl[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            dept: dept,
            emp: emp,
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
                dept = this.state.dept,
                currentFormMode = this.state.formMode;
            let
                promise,
                promiseDept,
                response;
            promiseDept = getDepartmentApiCall(dept)
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
            if (promiseDept) {
                promiseDept
                    .then(
                        (data) => {
                            console.log(data);
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
                    {/*<select defaultValue={""} value={"1"} name="Dept_id" id="dept" aria-label="Department "*/}
                    {/*        onChange={this.handleChange}>*/}
                    {/*    {this.state.dept.length > 0 && this.state.dept.map(dep =>*/}
                    {/*        <option value={dep.Dept_id} label={dep.Name} key={dep.Dept_id}/>*/}
                    {/*    )}*/}
                    {/*</select>*/}

                    {/*<select defaultValue={""} value={"1"} name="Employee_id" id="emp" aria-label="Pracownik "*/}
                    {/*        onChange={this.handleChange}>*/}
                    {/*    {this.state.emp.length > 0 && this.state.emp.map(dep =>*/}
                    {/*        <option value={dep.Employee_id} label={dep.Name} key={dep.Employee_id}/>*/}
                    {/*    )}*/}
                    {/*</select>*/}

                    {/*<FormInput*/}
                    {/*    type="Select"*/}
                    {/*    label="Pracownik "*/}
                    {/*    required*/}
                    {/*    name="Worker"*/}
                    {/*    placeholder="Pracownik"*/}
                    {/*    onChange={this.handleChange}*/}
                    {/*    value={this.state.emp.Employee_id}*/}
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