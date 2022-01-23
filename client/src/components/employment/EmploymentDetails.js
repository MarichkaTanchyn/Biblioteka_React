import React, {Component} from "react";
import {getEmploymentByIdApiCall} from "../../apiCalls/employmentApiCall";
import style from "./EmploymentList.module.css";
import {Link} from "react-router-dom";
import EmploymentDetailsData from "./EmploymentDetailsData";
import {withTranslation} from "react-i18next";


class EmploymentDetails extends Component {
    constructor(props) {
        super(props);
        let {employment_id} = props.match.params;
        console.log(employment_id);
        this.state = {
            employment_id: employment_id,
            empl: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchEmploymentDetails = () => {
        getEmploymentByIdApiCall(this.state.employment_id)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            empl: null,
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
    componentDidMount() {
        this.fetchEmploymentDetails()
    }

    render() {
        const {t} = this.props
        const {empl, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownika</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            console.log("looooog",empl);
            content = <EmploymentDetailsData emplData={empl}/>
        }

        return (
            <main className={style.main}>
                <h2>{t('employment.form.details')}</h2>
                {content}
                <p className="button-submit"><Link to={"/employments"} className={style['a-in-button']} >{t('form.actions.return')}</Link></p>
            </main>
        )

    }

}

export default withTranslation() (EmploymentDetails);