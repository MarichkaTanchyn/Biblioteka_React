const employmentBaseURL = "http://localhost:3000/api/employments";

export function getEmploymentApiCall(){
    const promise = fetch(employmentBaseURL);
    return promise;
}

export function getEmployeesAndDepartments() {
    const promise = fetch(employmentBaseURL + '/emps-and-depts');
    return promise;
}

export function getEmploymentByIdApiCall(employmentId) {
    const url = employmentBaseURL+'/'+employmentId;

    const promise = fetch(url);
    console.log("URLinAPI", url);
    console.log("employmentInAPI", promise);
    return promise;
}

export function addEmploymentApiCall(empl) {
    const emplString = JSON.stringify(empl);
    console.log("JSON",emplString);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: emplString
    }
    const promise = fetch(employmentBaseURL,options);
    return promise;
}

export function updateEmploymentApiCall(emplId, empl) {

    const url = employmentBaseURL + '/' +emplId;
    const emplString = JSON.stringify(empl);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: emplString
    }
    const promise = fetch(url,options);
    return promise;
}

export  function deleteEmploymentApiCall(emplId) {
    const url = employmentBaseURL + '/' + emplId;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    };
    const promise = fetch(url, options);
    return promise;
}