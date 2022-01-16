import React, {Component} from "react";
import style from "./DepartmentList.module.css";
import {getDepartmentApiCall} from "../../apiCalls/employeeApiCalls";
import DepartmentListTable from "./EmployeeListTable";
import {Link} from "react-router-dom";

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

    componentDidMount() {
        this.fetchDepartmentList();
    }

    render() {
        const {error, isLoaded, employees} = this.state;
        let content;
        if (error) {
            content = <p>Błąd: {error.message()}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych departamentów</p>
        } else {
            content = <DepartmentListTable deptList={employees}/>
        }

        return <main className={style.main}>
            <h2>Lista pracowników</h2>
            {content}
            <p className="button-submit"><Link className={style['a-in-button']} to={"/departments/add"}>Dodaj nowego
                pracownika</Link></p>

        </main>
    }
}

export default DepartmentList;
