import React, {Component} from "react";
import {getEmployeeByIdApiCall} from "../../apiCalls/employeeApiCalls";
import style from "../departments/Department.module.css";
import {Link} from "react-router-dom";
import EmployeeDetailsData from "./EmployeeDetailsData";
import {withTranslation} from "react-i18next";

class EmployeeDetails extends Component {
    constructor(props) {
        super(props);
        let {Employee_id} = props.match.params;
        this.state = {
            Employee_id: Employee_id,
            emp: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchEmployeeDetails = () => {
        getEmployeeByIdApiCall(this.state.Employee_id)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            emp: null,
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

    componentDidMount() {
        this.fetchEmployeeDetails()
    }

    render() {
        const {t} = this.props;
        const {emp, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownika</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            console.log("details", emp);
            content = <EmployeeDetailsData empData={emp}/>
        }

        return (
            <main className={style.main}>
                <h2>{t('emp.form.edit.pageTitle')}</h2>
                {content}
                <p className="button-submit">
                    <Link to={"/employees"}
                          className={style['a-in-button']}>
                        {t('form.actions.return')}
                    </Link>
                </p>
            </main>
        )

    }

}

export default withTranslation() (EmployeeDetails);