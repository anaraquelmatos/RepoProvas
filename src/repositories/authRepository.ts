import { User } from "@prisma/client";
import prisma from "../../config/database.js";

export type infoAuth = Omit<User, "id">;

export async function findByEmail(email: string) {
    return await prisma.user.findFirst({ where: { email } });
}

export async function insert(data: infoAuth) {
    return await prisma.user.create({ data });
}


const authRepos = {
    findByEmail,
    insert
}

export default authRepos;