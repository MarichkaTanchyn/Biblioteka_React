import React from "react";
import style from "./Department.module.css";
import DepartmentListTableRow from "./DepartmentListTableRow";


const DepartmentListTable = (props) => {
    const departments = props.deptList;
    console.log(departments);
    return (
        <table className={style['table-list']}>
            <thead>
            <tr>
                <th>Nazwa</th>
                <th>Ilość Pracowników</th>
                <th>Data Od</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {departments.length >0 && departments.map(dept =>
                <DepartmentListTableRow deptData={dept} key={dept.Dept_id}/>
            )}
            </tbody>
        </table>
    )
}
export default DepartmentListTable;