import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function registerTest(req: Request, res: Response) {

    const { name, pdfUrl, category, discipline, teacher }:
        {
            name: string, pdfUrl: string, category: string, discipline: string, teacher: string
        } = req.body;

    await testService.postTest(name, pdfUrl, category, discipline, teacher);

    res.sendStatus(201);
}