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
import {withTranslation} from "react-i18next";

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
                errorMessage = 'Pole powinno zawiera?? od 2 do 60 znak??w'
            }
        }
        if (fieldName === 'NumOfWorkers') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane';
            } else if (!checkTextLengthRange(fieldValue, 1, 1)) {
                errorMessage = 'Pole mo??e zawiera?? tylko 1 liczb??'
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
        const {t} = this.props;
        const {redirect} = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomy??lnie dodano nowy departament' : 'Pomy??lnie zaktualizowano departaments'
            return (
                <Redirect to={{
                    pathname: "/departments/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors ? 'Formularz zawiera b????dy' : ''
        const fetchError = this.state.error ? `B????d: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('dept.form.add.pageTitle') : t('dept.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main className={style.main}>
                <h2>{pageTitle}</h2>
                <form className={style.form} onSubmit={this.handleSubmit} action="/departments">
                    <FormInput
                        type="text"
                        label={t('dept.form.name')}
                        required
                        error={this.state.errors.Name}
                        name="Name"
                        placeholder="2-60 znak??w"
                        onChange={this.handleChange}
                        value={this.state.dept.Name}
                    />
                    <FormInput
                        type="number"
                        label={t('dept.form.maxNumberOfWorkers')}
                        required
                        error={this.state.errors.NumOfWorkers}
                        name="NumOfWorkers"
                        placeholder="1-9"
                        onChange={this.handleChange}
                        value={this.state.dept.NumOfWorkers}
                    />
                    <FormInput
                        type="date"
                        label={t('dept.form.dateOfStart')}
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

export default withTranslation() (DepartmentForm);