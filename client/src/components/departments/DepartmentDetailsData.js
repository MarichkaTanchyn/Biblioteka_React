import React, {Fragment} from "react";
import "./Department.module.css";

function DepartmentDetailsData(props) {
    const dept = props.deptData;
    const data = new Date(dept.DateOfStart);
    return (
        <Fragment>
            <p>Nazwa: {dept.DeptName} </p>
            <p>Data Od: {data.toLocaleDateString()} </p>
            <p>Liczba pracowników: {dept.NumOfWorkers} </p>
        </Fragment>
    )
}

export default DepartmentDetailsData;