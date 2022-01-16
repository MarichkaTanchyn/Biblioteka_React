import React, {Component} from "react";
import style from "./EmployeeList.module.css";
import {getEmployeeApiCall} from "../../apiCalls/employeeApiCalls";
import EmployeeListTable from "./EmployeeListTable";
import {Link} from "react-router-dom";

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : '';
        this.state = {
            error: null,
            isLoaded: false,
            employees: [],
            notice: notice
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

    componentDidMount() {
        this.fetchEmployeeList();
    }

    render() {
        const {error, isLoaded, employees} = this.state;
        let content;
        if (error) {
            content = <p>Błąd: {error.message()}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracowników</p>
        } else {
            content = <EmployeeListTable empList={employees}/>
        }

        return <main className={style.main}>
            <h2>Lista pracowników</h2>
            {content}
            <p>{this.state.notice}</p>
            <p className="button-submit"><Link className={style['a-in-button']} to={"/employees/add"}>Dodaj nowego
                pracownika</Link></p>

        </main>
    }
}

export default EmployeeList;
