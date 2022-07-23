import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function verifySessionError(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;

    const data = authorization?.replace("Bearer", "").trim();

    if (!data) return res.status(401).send("Token is required!");

    const token = jwt.verify(data, process.env.JWT_SECRET);

    if (!token) return res.status(401).send("Invalid token!");

    next();
}