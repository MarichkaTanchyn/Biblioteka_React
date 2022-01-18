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

export function addEmployeeApiCall(emp) {
    const empString = JSON.stringify(emp);
    console.log("JSON",empString);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: empString
    }
    const promise = fetch(employeeBaseURL,options);
    return promise;
}

export function updateEmployeeApiCall(empId, emp) {

    const url = employeeBaseURL + '/' +empId;
    const empString = JSON.stringify(emp);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: empString
    }
    const promise = fetch(url,options);
    return promise;
}

export  function deleteEmployeeApiCall(empId) {
    const url = employeeBaseURL + '/' + empId;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    };
    const promise = fetch(url, options);
    return promise;
}