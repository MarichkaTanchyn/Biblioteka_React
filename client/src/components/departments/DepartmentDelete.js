import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {deleteDepartmentApiCall} from "../../apiCalls/departmentApiCalls";

class DepartmentDelete extends Component{
    constructor(props) {
        super(props);
        let {deptId} = props.match.params;
        this.state = {
            deptId : deptId,
        }
    }

    fetchEmployeeDelete = () => {
        deleteDepartmentApiCall(this.state.deptId);
    }
    componentDidMount() {
        this.fetchEmployeeDelete();
    }
    render() {
        return (
            <Redirect to={"/departments/"}/>
        )
    }
}
export default DepartmentDelete;