import React, {Component} from "react";
import style from "./Department.module.css";
import {getDepartmentApiCall} from "../../apiCalls/departmentApiCalls";
import DepartmentListTable from "./DepartmentListTable";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            departments: []
        }
    }

    fetchDepartmentList = () => {
        getDepartmentApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        departments: data
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
        this.fetchDepartmentList();
    }

    render() {
        const {t} = this.props;
        const {error, isLoaded, departments} = this.state;
        let content;
        if (error) {
            content = <p>Błąd: {error.message()}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych departamentów</p>
        } else {
            content = <DepartmentListTable deptList={departments}/>
        }

        return <main className={style.main}>
            <h2>{t('dept.list.title')}</h2>
            {content}
            <p className="button-submit"><Link className={style['a-in-button']}
                                               to={"/departments/add"}>{t('dept.list.addNew')}</Link></p>

        </main>
    }
}

export default withTranslation() (DepartmentList);
