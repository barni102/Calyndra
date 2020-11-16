//VALIDATION
const Joi = require("joi");

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(5)
            .max(255)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(255)
            .required(),
        firstname: Joi.string(),
        lastname: Joi.string(),
        created_date: Joi.string()
            .isoDate()

    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;