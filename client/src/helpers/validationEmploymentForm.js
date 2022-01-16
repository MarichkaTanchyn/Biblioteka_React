function validateForm() {
    const emloyeeInput = document.getElementById("employeeInput");
    const departmentInput = document.getElementById("departmentInput");
    const salaryInput = document.getElementById("salaryInput");
    const dateFromInput = document.getElementById("Date")

    let valid = true;
    
    if (!checkRequired(emloyeeInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    }
    if (!checkRequired(departmentInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    }
    if (!checkRequired(salaryInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    }else if (!checkNumber(salaryInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno być liczbą";
    }else if (!checkNumberRange(salaryInput.value, 2000, 1_000_000)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno być liczbą w zakresie od 2000 do 1000000";
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    const nowString = [year,month,day].join('-');

    if (!checkRequired(dateFromInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    }
    else if (!checkDate(dateFromInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać date w formacie yyyy-MM-dd (np. 2000-01-01)";
    }
    else if (checkDateIfAfter(dateFromInput.value, nowString)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Data nie może być w przyszłości";
    }
    else if (checkRequired(dateToInput.value)&& checkDate(dateToInput.value) && checkDateIfAfter(dateToInput.value, dateFromInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Data powinna być póżniejsza niż data od";
    }
}