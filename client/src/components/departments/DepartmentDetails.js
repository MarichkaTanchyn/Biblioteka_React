import React, {Component} from "react";
import style from "./Department.module.css";
import {Link} from "react-router-dom";
import {getEmploymentByIdApiCall} from "../../apiCalls/departmentApiCalls";
import DepartmentDetailsData from "./DepartmentDetailsData";

class DepartmentDetails extends Component {
    constructor(props) {
        super(props);
        let {deptId} = props.match.params;
        console.log(2,deptId);
        this.state = {
            deptId: deptId,
            dept: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchDepartmentDetails = () => {
        getEmploymentByIdApiCall(this.state.deptId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            dept: null,
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
    componentDidMount() {
        this.fetchDepartmentDetails()
    }

    render() {
        const {dept, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownika</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <DepartmentDetailsData deptData={dept}/>
        }

        return (
            <main className={style.main}>
                <h2>Szczegóły Departamentów</h2>
                {content}
                <p className="button-submit"><Link to={"/departments"} className={style['a-in-button']} >Powrót</Link></p>
            </main>
        )

    }

}

export default DepartmentDetails;