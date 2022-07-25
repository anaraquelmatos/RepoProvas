import prisma from "../config/database.js";
import bcrypt from "bcrypt";

async function main() {
    await prisma.user.upsert({
        where: {
            email: "admin@admin.com"
        },
        update: {},
        create: {
            email: "admin@admin.com",
            password: bcrypt.hashSync("123456", 10)
        }
    })
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});