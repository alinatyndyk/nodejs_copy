const Joi = require('joi');
const {EMAIL, PASSWORD} = require("../constants/regex.enum");
const {ApiError} = require("../errors");

const nameValidator = Joi.string().alphanum().min(2).max(35).trim();
const ageValidator = Joi.number().integer().min(1).max(120);
const emailValidator = Joi.string().regex(EMAIL).lowercase().trim().error(new ApiError('Email not valid', 400));
const passValidator = Joi.string().regex(PASSWORD).error(new ApiError('Password not valid'));


const newUserValidator = Joi.object({
    name: nameValidator.required(),
    age: ageValidator,
    email: emailValidator.required(),
    password: passValidator.required(),

})

const updateUserValidator = Joi.object({
    name: nameValidator.required(),
    age: ageValidator,
    email: emailValidator.required(),
    password: passValidator.required(),

})

const loginUserValidator = Joi.object({
    email: emailValidator.required().error(new ApiError('Wrong email or pass', 400)),
    password: passValidator.required().error(new ApiError('Wrong email or pass', 400)),

});

const userPasswordValidator = Joi.object({
    password: passValidator.required().error(new ApiError('Wrong email or pass', 400)),

});

const userEmailValidator = Joi.object({
    email: emailValidator.required().error(new ApiError('Wrong email or pass', 400)),
})

module.exports = {
    newUserValidator,
    updateUserValidator,
    loginUserValidator
}