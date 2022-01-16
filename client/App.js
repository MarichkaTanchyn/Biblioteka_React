import { BrowserRouter as Router,
    Routes, Route
} from "react-router-dom";

import Header from "./components/fragments/Header";
import Footer from "./components/fragments/Footer";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/MainContent";
import EmployeeList from "./components/employee/EmployeeList";
import EmploymentList from "./components/employment/EmploymentList";

const App = () => {
    return (
        <Router >
        <Header/>
        <Navigation/>
        <Routes>
            <Route exact path="/" element={<MainContent/>}/>
            <Route exact path="/employees" element={<EmployeeList/>}/>
            <Route exact path="/employments" element={<EmploymentList/>}/>
        </Routes>
        <Footer/>
         </Router>
    );

}



export default App;
