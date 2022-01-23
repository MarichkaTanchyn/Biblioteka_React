import React, {Component} from "react";
import style from "./EmploymentList.module.css";
import EmploymentListTable from "./EmploymentListTable";
import {Link} from "react-router-dom";
import {getEmploymentApiCall} from "../../apiCalls/employmentApiCall";
import {withTranslation} from "react-i18next";


class EmploymentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            employments: []
        }
    }

    fetchEmploymentList = () => {
        getEmploymentApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(2,data);
                    this.setState({
                        isLoaded: true,
                        employments: data
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
    componentDidMount() {
        this.fetchEmploymentList();
    }
    render() {
        const {t} = this.props;
        const {error, isLoaded, employments } = this.state;
        let content;
        if (error) {
            content = <p>Błąd: {error.message()}</p>
        }else if(!isLoaded){
            content = <p>Ładowanie danych zatrudnień</p>
        }else {
            content = <EmploymentListTable emplList={employments}/>
        }

        return <main className={style.main}>
            <h2>{t('employment.list.title')}</h2>
            {content}
            <p className="button-submit"><Link
                className={style['a-in-button']}
                to={"/employments/add"}>{t('employment.form.add.bntLabel')}</Link></p>

        </main>
    }
}

export default withTranslation() (EmploymentList);
