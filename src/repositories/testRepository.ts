import { Test } from "@prisma/client";
import { transformDocument } from "@prisma/client/runtime/index.js";
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

export async function findTestsByDiscipline() {
    return await prisma.term.findMany({
        select: {
            id: true,
            number: true,
            disciplines: {
                select: {
                    id: true,
                    name: true,
                    teachersDisciplines: {
                        select: {
                            id: true,
                            teacherId: true,
                            disciplineId: true,
                            teacher: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            },
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    categoryId: true,
                                    teacherDisciplineId: true,
                                    category: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}

export async function findTestsByTeacher() {
    return await prisma.teacher.findMany({
        select: {
            id: true,
            name: true,
            teachersDisciplines: {
                select: {
                    id: true,
                    teacherId: true,
                    disciplineId: true,
                    discipline: {
                        select: {
                            id: true,
                            name: true,
                            termId: true,
                            term: {
                                select: {
                                    id: true,
                                    number: true,
                                }
                            },
                        }
                    },
                    tests: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            categoryId: true,
                            teacherDisciplineId: true,
                            category: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }

    })
}

const testRepos = {
    findByCategoryName,
    findByDisciplineName,
    findByTeacherName,
    findTeacherDisciplineById,
    insert,
    findTestsByDiscipline,
    findTestsByTeacher
}

export default testRepos;