import { Test } from "@prisma/client";
import prisma from "../../config/database.js";

export type infoTest = Omit<Test, "id">;

export async function findByCategoryName(name: string) {
    return await prisma.category.findFirst({ where: { name } });
}

export async function findByDisciplineName(name: string) {
    return await prisma.discipline.findFirst({ where: { name } });
}

export async function findByTeacherName(name: string) {
    return await prisma.teacher.findFirst({ where: { name } });
}

export async function findTeacherDisciplineById(disciplineId: number, teacherId: number) {
    return await prisma.teacherDiscipline.findFirst({ where: { disciplineId, teacherId } });
}

export async function insert(data: infoTest) {
    await prisma.test.create({ data });
}

const testRepos = {
    findByCategoryName,
    findByDisciplineName,
    findByTeacherName,
    findTeacherDisciplineById,
    insert
}

export default testRepos;