import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom";

import Header from "./components/fragments/Header";
import Footer from "./components/fragments/Footer";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/MainContent";
import EmployeeList from "./components/employee/EmployeeList";
import EmploymentList from "./components/employment/EmploymentList";
import DepartmentList from "./components/departments/DepartmentList";
import EmployeeDetails from "./components/employee/EmployeeDetails";
import EmploymentDetails from "./components/employment/EmploymentDetails";
import DepartmentDetails from "./components/departments/DepartmentDetails";
import EmployeeForm from "./components/employee/EmployeeForm";
import DepartmentForm from "./components/departments/DepartmentForm";
import EmploymentForm from "./components/employment/EmploymentForm";

const App = () => {
    return (
        <Router>
            <Header/>
            <Navigation/>
            <Switch>
                <Route exact path="/" component={MainContent}/>
                <Route exact path="/employees" component={EmployeeList}/>
                <Route exact path="/employees/details/:Employee_id" component={EmployeeDetails}/>
                <Route exact path="/employees/edit/:empId" component={EmployeeForm}/>
                <Route exact path="/employees/add" component={EmployeeForm}/>

                <Route exact path="/employments" component={EmploymentList}/>
                <Route exact path="/employments/details/:employment_id" component={EmploymentDetails}/>
                <Route exact path="/employments/edit/:emplId" component={EmploymentForm}/>
                <Route exact path="/employments/add" component={EmploymentForm}/>

                <Route exact path="/departments" component={DepartmentList}/>
                <Route exact path="/departments/details/:deptId" component={DepartmentDetails}/>
                <Route exact path="/departments/edit/:deptId" component={DepartmentForm}/>
                <Route exact path="/departments/add" component={DepartmentForm}/>
            </Switch>
            <Footer/>
        </Router>
    );

}


export default App;
