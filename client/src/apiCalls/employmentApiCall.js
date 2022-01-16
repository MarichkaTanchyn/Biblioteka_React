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