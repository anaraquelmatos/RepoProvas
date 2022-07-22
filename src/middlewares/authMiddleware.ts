import { NextFunction, Request, Response } from "express";
import { authDataSignUp } from "../schemas/authSchema.js";

export default async function verifyUserDataSignUp(req: Request, res: Response, next: NextFunction) {

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

