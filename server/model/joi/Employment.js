const Joi =
    require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "number.min":
                err.message = 'Pole powinno zawierać minimalnie ' + err.local.limit + ' znaki';
                break;
            case "number.max":
                err.message = 'Pole powinno zawierać maksymalnie ' + err.local.limit + ' znaków';
                break;
            case "date.min":
                err.message = 'Data nie poże być wcześniejsza niż 2000 rok';
                break;
            case "date.max":
                err.message = 'Data nie poże być póżniejsza niż dziś';
                break;
            default:
                break;
        }
    });
    return errors;
}
const emplSchema = Joi.object({
    id: Joi.number()
        .optional()
        .allow(""),
    deptId: Joi.number()
        .required(),
    emp_Id: Joi.number()
        .required(),
    telNum: Joi.number()
        .min(4)
        .max(1111111111111)
        .required()
        .error(errMessages),
    DataOd: Joi.date()
        .min(2000)
        .max("now")
        .required()
        .error(errMessages),
});


module.exports = emplSchema;
