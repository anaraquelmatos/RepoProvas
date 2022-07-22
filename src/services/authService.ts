import authRepos, { infoAuth } from "../repositories/authRepository.js";

import bcrypt from "bcrypt";

export async function postSignUp(data: infoAuth) {

    const duplicatedEmail = await authRepos.findByEmail(data.email);

    if (duplicatedEmail) {
        throw {
            type: "conflict",
            message: "Email already registered!"
        }
    }

    const passwordEncrypted = await encryptData(data.password);

    await insertIntoDatabase({email: data.email, password: passwordEncrypted});
}

async function encryptData(data: string) {
    const NUMBER = 10;
    const encrypted = bcrypt.hashSync(data, NUMBER);
    return encrypted;
}

async function insertIntoDatabase(data: infoAuth) {
    authRepos.insert(data);
}