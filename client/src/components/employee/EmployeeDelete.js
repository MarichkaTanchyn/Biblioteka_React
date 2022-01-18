import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {deleteEmployeeApiCall} from "../../apiCalls/employeeApiCalls";

class EmployeeDelete extends Component{
    constructor(props) {
        super(props);
        let {empId} = props.match.params;
        this.state = {
            empId : empId,
        }
    }

    fetchEmployeeDelete = () => {
        deleteEmployeeApiCall(this.state.empId);
    }
    componentDidMount() {
        this.fetchEmployeeDelete();
    }
    render() {
        return (
            <Redirect to={"/employees/"}/>
        )
    }
}
export default EmployeeDelete;