const employmentBaseURL = "http://localhost:3000/api/employments";

export function getEmploymentApiCall(){
    const promise = fetch(employmentBaseURL);
    return promise;
}

export function getEmploymentByIdApiCall(employmentId) {
    const url = employmentBaseURL+'/'+employmentId;
    console.log(url);
    const promise = fetch(url);
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