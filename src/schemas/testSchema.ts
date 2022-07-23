import Joi from "joi";

export const testData = Joi.object({
    name: Joi.string().required(),
    pdfUrl: Joi.string().required(),
    category: Joi.string().required(),
    discipline: Joi.string().required(),
    teacher: Joi.string().required(),
})