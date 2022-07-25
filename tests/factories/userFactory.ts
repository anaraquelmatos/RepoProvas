import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import prisma from "./../../config/database.js";

interface Login {
    email: string;
    password: string;
}

function createLogin(email = "test@gmail.com", passwordLength = 10) {

    return {
        email,
        password: faker.internet.password(passwordLength)
    }
}

function signUp(email = "test@gmail.com", passwordLength = 10) {

    const password = faker.internet.password(passwordLength);

    return {
        email,
        password: password,
        confirmPassword: password
    }
}

async function insertUser(login: Login) {
    const user = await prisma.user.create({
        data: {
            email: login.email,
            password: bcrypt.hashSync(login.password, 12)
        }
    })

    return user;
}

function userAccess(email = "test@gmail.com", passwordLength = 10) {
    return {
        email,
        password: faker.internet.password(passwordLength)
    }
}

const userFactory = {
    createLogin,
    signUp,
    insertUser,
    userAccess
}

export default userFactory;
