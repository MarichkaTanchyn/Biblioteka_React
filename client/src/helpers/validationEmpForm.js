
function validateForm() {
  const firstNameInput = document.getElementById("Name");
  const lastNameInput = document.getElementById("LastName");
  const emailInput = document.getElementById("Email");
  const errorFirstName = document.getElementById("errorFirstName");
  const errorLastName = document.getElementById("errorLastName");
  const errorEmail = document.getElementById("errorEmail");
  const errorSummary = document.getElementById("errorsSummary");
  resetErrors(
    [firstNameInput, lastNameInput, emailInput],
    [errorFirstName, errorLastName, errorEmail],
    errorSummary
  );

  let valid = true;

  if (!checkRequired(firstNameInput.value)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Pole jest wymagane";
  } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  }

  if (!checkRequired(lastNameInput.value)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Pole jest wymagane";
  } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  }

  if (!checkRequired(emailInput.value)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Pole jest wymagane";
  } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  } else if (!checkEmail(emailInput.value)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Pole powinno zawierać prawidłowy adres email";
  }

  if (!valid) {
      errorSummary.innerText = "Formularz zawiera błędy";
  }
  return false;
}
