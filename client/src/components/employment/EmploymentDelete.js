import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {deleteEmploymentApiCall} from "../../apiCalls/employmentApiCall";

class EmploymentDelete extends Component{
    constructor(props) {
        super(props);
        let {emplId} = props.match.params;
        this.state = {
            emplId : emplId,
        }
    }

    fetchEmployeeDelete = () => {
        deleteEmploymentApiCall(this.state.emplId);
    }
    componentDidMount() {
        this.fetchEmployeeDelete();
    }
    render() {
        return (
            <Redirect to={"/employments/"}/>
        )
    }
}
export default EmploymentDelete;