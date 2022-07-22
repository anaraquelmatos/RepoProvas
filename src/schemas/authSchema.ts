import Joi from "joi";
import { infoAuth } from "../repositories/authRepository.js";

export const authDataSignUp = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
    confirmPassword: Joi.string().min(6).max(10).required()
})

export const authDataSignIn = Joi.object<infoAuth>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required()
})
