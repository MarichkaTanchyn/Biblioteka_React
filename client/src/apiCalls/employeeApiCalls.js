const employeeBaseURL = "http://localhost:3000/api/employees";

export function getEmployeeApiCall() {
    const promise = fetch(employeeBaseURL);
    return promise;
}

export function getEmployeeByIdApiCall(empId){
    const url = employeeBaseURL + '/'+ empId ;
    const promise = fetch(url);
    return promise;
}