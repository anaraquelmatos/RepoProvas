
import testRepos, { infoTest } from "../repositories/testRepository.js";

import dotenv from "dotenv";
dotenv.config();

export async function postTest(name: string, pdfUrl: string, category: string, discipline: string,
    teacher: string) {

    const dataId = await checkSentData(category, discipline, teacher);

    const teacherDisciplineId = await searchTeacherDisciplineId(dataId.disciplineId, dataId.teacherId);

    if (!teacherDisciplineId) throw { type: "not found", message: "The teacher is not registered in this discipline!" };

    await insertIntoDatabase({
        name: name, pdfUrl: pdfUrl, categoryId: dataId.categoryId,
        teacherDisciplineId: teacherDisciplineId.id
    });
}

async function checkSentData(category: string, discipline: string, teacher: string) {

    const categoryData = await testRepos.findByCategoryName(category);

    if (!categoryData) throw { type: "not found", message: "Category name not found!" };

    const disciplineData = await testRepos.findByDisciplineName(discipline);

    if (!disciplineData) throw { type: "not found", message: "Discipline name not found!" };

    const teacherData = await testRepos.findByTeacherName(teacher);

    if (!teacherData) throw { type: "not found", message: "Teacher name not found!" };

    return { categoryId: categoryData.id, disciplineId: disciplineData.id, teacherId: teacherData.id };
}

async function searchTeacherDisciplineId(disciplineId: number, teacherId: number) {
    const teacherDiscipline = await testRepos.findTeacherDisciplineById(disciplineId, teacherId);
    return teacherDiscipline;
}

async function insertIntoDatabase(data: infoTest) {
    testRepos.insert(data);
}

export async function getTestsByDiscipline() {

    const testByDiscipline = await testRepos.findTestsByDiscipline();

    return testByDiscipline;
}

export async function getTestsByTeacher() {

    const testByTeacher = await testRepos.findTestsByTeacher();

    return testByTeacher;
}





