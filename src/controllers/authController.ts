import { Request, Response } from "express";
import { infoAuth } from "../repositories/authRepository.js";
import * as authService from "../services/authService.js";

export async function SignUp(req: Request, res: Response) {

    const data: infoAuth = req.body;

    await authService.postSignUp(data);

    res.sendStatus(201);
}