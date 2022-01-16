const Joi =
    require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min" || "number.min":
                err.message = 'Pole powinno zawierać co najmniej '+ err.local.limit +' znaki';
                break;
            case "string.max":
                err.message = 'Pole powinno zawierać co najwyżej '+ err.local.limit +'znaki';
                break;
            case "number.min":
                err.message = 'Pole powinno zawierać co najmniej '+ err.local.limit +' znak';
                break;
            case "number.max":
                err.message = 'Pole powinno zawierać co najwyżej '+ err.local.limit +'znaki';
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
const deptSchema = Joi.object({
    id: Joi.number()
        .optional()
        .allow(""),
    name: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    amountofEmp: Joi.number()
        .min(1)
        .max(10)
        .required()
        .error(errMessages),
    dateOfStart: Joi.date()
        .min(2000)
        .max("now")
        .required()
        .error(errMessages),
});



module.exports = deptSchema;
