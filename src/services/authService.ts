import authRepos, { infoAuth } from "../repositories/authRepository.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function postSignUp(data: infoAuth) {

    await searchUserEmail(data.email);

    const passwordEncrypted = await encryptData(data.password);

    await insertIntoDatabase({ email: data.email, password: passwordEncrypted });
}

async function searchUserEmail(email: string) {

    const verifyEmail = await authRepos.findByEmail(email);

    if (verifyEmail) throw { type: "conflict", message: "An account already exists with this email!" };
}

async function encryptData(data: string) {
    const NUMBER = 10;
    const encrypted = bcrypt.hashSync(data, NUMBER);
    return encrypted;
}

async function insertIntoDatabase(data: infoAuth) {
    authRepos.insert(data);
}

export async function postSignIn(data: infoAuth) {

    const confirmEmail = await authRepos.findByEmail(data.email);

    if (!confirmEmail) throw { type: "not found", message: "Unregistered email!" };

    await validatePassword(data.password, confirmEmail.password);

    const token = await generateToken(confirmEmail.id);

    return token;
}

async function validatePassword(password: string, passwordEncrypted: string) {

    if (!bcrypt.compareSync(password, passwordEncrypted)) {
        throw { type: "unauthorized", message: "Incorrect password!" };
    }
}

async function generateToken(id: number) {
    const data = { id };
    const secretKey = process.env.JWT_SECRET;
    const settings = { expiresIn: 60 * 60 * 24 * 30 }
    const token = jwt.sign(data, secretKey, settings);
    return token;
}
