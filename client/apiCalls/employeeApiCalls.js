const employeeBaseURL = "http://localhost:3000/api/employees";

export function getEmployeeApiCall(){
    const promise = fetch(employeeBaseURL);
    return promise;
}