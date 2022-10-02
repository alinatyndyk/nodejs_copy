const Joi = require('joi');
const {EMAIL, PASSWORD} = require("../constants/regex.enum");
const {ApiError} = require("../errors");

const newUserValidator = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).trim().required(),
    age: Joi.number().integer().min(16).max(99).default(18),
    email: Joi.string().regex(EMAIL).lowercase().trim().required().error(new ApiError('email  not valid', 400)),
    password: Joi.string().regex(PASSWORD).required().error(new ApiError('pass  not valid', 400))
})

module.exports = {
    newUserValidator
}