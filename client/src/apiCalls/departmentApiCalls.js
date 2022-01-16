const departmentBaseURL = "http://localhost:3000/api/departments";

export function getDepartmentApiCall(){
    const promise = fetch(departmentBaseURL);
    return promise;
}

export function getEmploymentByIdApiCall(deptId){
    const url = departmentBaseURL + '/'+ deptId ;
    const promise = fetch(url);
    return promise;
}