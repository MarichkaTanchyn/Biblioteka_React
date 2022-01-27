export const formValidationKeys = {
    notEmpty: "notEmpty",
    "len_2_30": "len_2_30",
    "len_2_40": "len_2_40",
    "dateBefore": "dateBefore",
    "dateAfter": "dateAfter",
    "number": "number",
    "numberRange": "numberRange",
    "formErrors": "formErrors"
}

export function getValidationErrorKeys(error) {
    return 'error.validation.'+error;
}

const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}

export default formMode;