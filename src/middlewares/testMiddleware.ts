import { NextFunction, Request, Response } from "express";
import { testData } from "../schemas/testSchema.js";

export async function verifyTestData(req: Request, res: Response, next: NextFunction) {

    const { name, pdfUrl, category, discipline, teacher }:
        {
            name: string, pdfUrl: string, category: string, discipline: string, teacher: string
        } = req.body;

    const { error } = testData.validate({ name, pdfUrl, category, discipline, teacher },
        { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}

const verifyTest = {
    verifyTestData
}

export default verifyTest;