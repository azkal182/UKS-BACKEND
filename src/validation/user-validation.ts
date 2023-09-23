import Joi from "joi";

enum UserRole {
    ADMIN = "ADMIN",
    UKS = "UKS",
  }
const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    role: Joi.string().valid(...Object.values(UserRole)).required(),
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).optional(),
    name: Joi.string().max(100).optional(),
    role: Joi.string().valid(...Object.values(UserRole)).required(),
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}
