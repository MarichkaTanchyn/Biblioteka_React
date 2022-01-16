import React from "react";
import style from "./EmploymentList.module.css"
import EmploymentListTableRow from "./EmploymentListTableRow";


const EmploymentListTable = (props) => {
    const employments = props.emplList;

    return (
        <table className={style['table-list']}>
            <thead>
            <tr>
                <th>Departament</th>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Numer Telefonu</th>
                <th>Data Zatrudnienia</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {employments.length > 0 && employments.map(empl =>
                <EmploymentListTableRow emplData={empl} key={empl.id}/>
            )}
            </tbody>
        </table>
    )
}
export default EmploymentListTable;