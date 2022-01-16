const employmentBaseURL = "http://localhost:3000/api/employments";

export function getEmploymentApiCall(){
    const promise = fetch(employmentBaseURL);
    return promise;
}