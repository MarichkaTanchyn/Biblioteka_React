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
import EmployeeDelete from "./components/employee/EmployeeDelete";
import EmploymentDelete from "./components/employment/EmploymentDelete";
import DepartmentDelete from "./components/departments/DepartmentDelete";
import {Component} from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";
import {getCurrentUser} from "./helpers/authHelper";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            prevPath: ''
        }
    }

    handleLogin = (user) => {
        localStorage.setItem("user", user)
        this.setState({user: user})
    }

    handleLogout = () => {
        localStorage.removeItem("user")
        this.setState({user: undefined})
    }

    componentDidMount() {
        const currentUser = getCurrentUser()
        this.setState({user: currentUser})
    }
    render() {


        return (
            <Router forceRefresh={true}>
                <Header handleLogout={this.handleLogout}/>
                <Navigation/>
                <Switch>
                    <Route exact path="/" component={MainContent}/>
                    <Route exact
                           path="/login"
                           render={(props) => (
                               <LoginForm handleLogin={this.handleLogin}/>
                           )}
                    />
                    <Route exact path="/" component={MainContent}/>
                    <ProtectedRoute exact={true} path="/employees" component={EmployeeList}/>
                    <Route exact path="/employees" component={EmployeeList}/>

                    <Route exact path="/employees/details/:Employee_id" component={EmployeeDetails}/>
                    <Route exact path="/employees/edit/:empId" component={EmployeeForm}/>
                    <Route exact path="/employees/delete/:empId" component={EmployeeDelete}/>
                    <Route exact path="/employees/add" component={EmployeeForm}/>

                    <ProtectedRoute exact={true} path="/employments" component={EmploymentList}/>
                    {/*<Route exact path="/employments" component={EmploymentList}/>*/}
                    <Route exact path="/employments/details/:employment_id" component={EmploymentDetails}/>
                    <Route exact path="/employments/edit/:emplId" component={EmploymentForm}/>
                    <Route exact path="/employments/delete/:emplId" component={EmploymentDelete}/>
                    <Route exact path="/employments/add" component={EmploymentForm}/>

                    <ProtectedRoute exact={true} path="/departments" component={DepartmentList}/>
                    <Route exact path="/departments/details/:deptId" component={DepartmentDetails}/>
                    <Route exact path="/departments/edit/:deptId" component={DepartmentForm}/>
                    <Route exact path="/departments/delete/:deptId" component={DepartmentDelete}/>
                    <Route exact path="/departments/add" component={DepartmentForm}/>
                </Switch>
                <Footer/>
            </Router>
        );
    }
}


export default App;
