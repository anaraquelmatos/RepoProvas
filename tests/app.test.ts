import App from "./../src/app.js";

import supertest from "supertest";
import prisma from "../config/database.js";
import dotenv from "dotenv";
import userFactory from "./factories/userFactory.js";
dotenv.config();

const INVALID_EMAIL = "test";
const WRONG_PASSWORD = "123456";
const INVALID_PASSWORD = "12345";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'test@gmail.com'`;
});

describe("User tests suite", () => {
    it("given email and password, create user", async () => {
        const signUp = userFactory.signUp();
        const response = await supertest(App).post(`/sign-up`).send(signUp);
        expect(response.statusCode).toBe(201);

        const user = await prisma.user.findFirst({
            where: { email: signUp.email }
        });

        expect(user.email).toBe(signUp.email);
    });

    it("given email and password already in use, fail to create user", async () => {
        const signUp = userFactory.signUp();
        await userFactory.insertUser({ email: signUp.email, password: signUp.password });
        const response = await supertest(App).post(`/sign-up`).send(signUp);
        expect(response.statusCode).toBe(409);
    });

    it("given an invalid email", async () => {
        const signUp = userFactory.createLogin();
        await userFactory.insertUser(signUp);
        const login = { email: INVALID_EMAIL };
        const response = await supertest(App).post(`/sign-in`).send(login);
        expect(response.statusCode).toBe(422);
    });

    it("given an invalid password without min length", async () => {
        const signUp = userFactory.createLogin();
        const user = await userFactory.insertUser(signUp);
        const login = { email: user.email, password: INVALID_PASSWORD };
        const response = await supertest(App).post(`/sign-in`).send(login);
        expect(response.statusCode).toBe(422);
    });

    it("given incorrect password", async () => {
        const signUp = userFactory.createLogin();
        const user = await userFactory.insertUser(signUp);
        const login = { email: user.email, password: WRONG_PASSWORD };
        const response = await supertest(App).post(`/sign-in`).send(login);
        expect(response.statusCode).toBe(401);
    });

    it("given unregistered email", async () => {
        const signUp = userFactory.createLogin();
        const login = { email: signUp.email, password: signUp.password };
        const response = await supertest(App).post(`/sign-in`).send(login);
        expect(response.statusCode).toBe(404);
    });

    it("given valid email and password, receive token", async () => {
        const login = userFactory.createLogin();
        await userFactory.insertUser(login);
        const response = await supertest(App).post(`/sign-in`).send(login);
        const token = response.body.token;
        expect(token).not.toBeNull();
    });

    it("create test without token", async () => {
        const response = await supertest(App).post(`/test`).send({
            name: "Programação",
            pdfUrl: "https://",
            category: "Projeto",
            discipline: "Humildade",
            teacher: "Bruna Hamori"
        });
        expect(response.statusCode).toBe(401);
    });

    it("given invalid category to create test", async () => {
        const login = userFactory.createLogin();
        await userFactory.insertUser(login);
        const signIn = await supertest(App).post(`/sign-in`).send(login);
        const token = signIn.body.token;
        const response = await supertest(App).post(`/test`).send({
            name: "Programação",
            pdfUrl: "https://",
            category: "test",
            discipline: "JavaScript",
            teacher: "Diego Pinho"
        }).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
    });

    it("given invalid discipline to create test", async () => {
        const login = userFactory.createLogin();
        await userFactory.insertUser(login);
        const signIn = await supertest(App).post(`/sign-in`).send(login);
        const token = signIn.body.token;
        const response = await supertest(App).post(`/test`).send({
            name: "Programação",
            pdfUrl: "https://",
            category: "test",
            discipline: "CSS",
            teacher: "Diego Pinho"
        }).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
    });

    it("given invalid teacher to create test", async () => {
        const login = userFactory.createLogin();
        await userFactory.insertUser(login);
        const signIn = await supertest(App).post(`/sign-in`).send(login);
        const token = signIn.body.token;
        const response = await supertest(App).post(`/test`).send({
            name: "Programação",
            pdfUrl: "https://",
            category: "Projeto",
            discipline: "JavaScript",
            teacher: "Ana"
        }).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
    });

    it("given invalid teacherDisciplineId to create test", async () => {
        const login = userFactory.createLogin();
        await userFactory.insertUser(login);
        const signIn = await supertest(App).post(`/sign-in`).send(login);
        const token = signIn.body.token;
        const response = await supertest(App).post(`/test`).send({
            name: "Programação",
            pdfUrl: "https://",
            category: "Projeto",
            discipline: "Humildade",
            teacher: "Diego Pinho"
        }).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
    });

    it("create test with valid informations", async () => {
        const login = userFactory.createLogin();
        await userFactory.insertUser(login);
        const signIn = await supertest(App).post(`/sign-in`).send(login);
        const token = signIn.body.token;
        const response = await supertest(App).post(`/test`).send({
            name: "Programação",
            pdfUrl: "https://",
            category: "Projeto",
            discipline: "Humildade",
            teacher: "Bruna Hamori"
        }).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(201);
    });

    it("view tests by discipline without token", async () => {
        const response = await supertest(App).get(`/tests-by-discipline`);
        expect(response.statusCode).toBe(401);
    });

    it("view tests by discipline", async () => {
        const login = userFactory.createLogin();
        await userFactory.insertUser(login);
        const signIn = await supertest(App).post(`/sign-in`).send(login);
        const token = signIn.body.token;
        const response = await supertest(App).get(`/tests-by-discipline`).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });

    it("view tests by teacher without token", async () => {
        const response = await supertest(App).get(`/tests-by-teacher`);
        expect(response.statusCode).toBe(401);
    });

    it("view tests by teacher", async () => {
        const login = userFactory.createLogin();
        await userFactory.insertUser(login);
        const signIn = await supertest(App).post(`/sign-in`).send(login);
        const token = signIn.body.token;
        const response = await supertest(App).get(`/tests-by-teacher`).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});