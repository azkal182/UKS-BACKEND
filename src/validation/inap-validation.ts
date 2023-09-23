import Joi from "joi";

enum Status {
    PULANG = "PULANG",
    DIRAWAT = "DIRAWAT",
    DIUKS="DI UKS"
  }
const registerInapValidation = Joi.object({
    complaint: Joi.string().max(100).required(),
    createdAt: Joi.date(),
    returnAt: Joi.date().optional(),
    status: Joi.string().valid(...Object.values(Status)).required(),
    patient:{
        name: Joi.string().max(100).required(),
        address: Joi.string().max(100).required(),
        grade : Joi.string().optional(),
        hostel : Joi.string().max(15)
    }
});

const changeStatusValidation = Joi.object({
    id: Joi.number().required(),
    status: Joi.string().valid(...Object.values(Status)).required(),
});



export {
    registerInapValidation,
    changeStatusValidation
}
