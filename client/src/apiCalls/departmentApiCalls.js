const departmentBaseURL = "http://localhost:3000/api/departments";

export function getDepartmentApiCall(){
    const promise = fetch(departmentBaseURL);
    return promise;
}

export function getDepartmentByIdApiCall(deptId){
    const url = departmentBaseURL + '/'+ deptId ;
    const promise = fetch(url);
    return promise;
}

export function addDepartmentApiCall(dept) {
    const deptString = JSON.stringify(dept);
    console.log("JSON",deptString);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: deptString
    }
    const promise = fetch(departmentBaseURL,options);
    return promise;
}

export function updateDepartmentApiCall(deptId, dept) {

    const url = departmentBaseURL + '/' +deptId;
    const deptString = JSON.stringify(dept);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: deptString
    }
    const promise = fetch(url,options);
    return promise;
}

export  function deleteDepartmentApiCall(deptId) {
    const url = departmentBaseURL + '/' + deptId;
    console.log("ID",deptId);
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    };
    const promise = fetch(url, options);
    return promise;
}