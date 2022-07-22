import { Request, Response } from "express";
import { infoAuth } from "../repositories/authRepository.js";
import * as authService from "../services/authService.js";

export async function SignUp(req: Request, res: Response) {

    const data: infoAuth = req.body;

    await authService.postSignUp(data);

    res.sendStatus(201);
}

export async function SignIn(req: Request, res: Response) {

    const data: infoAuth = req.body;

    const token = await authService.postSignIn(data);

    res.send({token}).status(200);
}