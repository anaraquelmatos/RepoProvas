import { NextFunction, Request, Response } from "express";
import { infoAuth } from "../repositories/authRepository.js";
import { authDataSignIn, authDataSignUp } from "../schemas/authSchema.js";

export async function verifyUserDataSignUp(req: Request, res: Response, next: NextFunction) {

    const { email, password, confirmPassword }:
        { email: string, password: string, confirmPassword: string } = req.body;

    const { error } = authDataSignUp.validate({ email, password, confirmPassword }, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    if (password !== confirmPassword) {
        throw {
            type: "schema",
            message: "Passwords are different!"
        }
    }

    next();
}

export async function verifyUserDataSignIn(req: Request, res: Response, next: NextFunction) {

    const data: infoAuth = req.body;

    const { error } = authDataSignIn.validate(data, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}

const verifyUser = {
    verifyUserDataSignUp,
    verifyUserDataSignIn
}

export default verifyUser;
