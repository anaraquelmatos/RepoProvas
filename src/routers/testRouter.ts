import { Router } from "express";
import { listTestsByDiscipline, listTestsByTeacher, registerTest } from "../controllers/testController.js";
import { verifySessionError } from "../middlewares/sessionMiddleware.js";
import { verifyTestData } from "../middlewares/testMiddleware.js";

const test = Router();

test.post("/test", verifySessionError, verifyTestData, registerTest);
test.get("/tests-by-discipline", verifySessionError, listTestsByDiscipline);
test.get("/tests-by-teacher", verifySessionError, listTestsByTeacher);

export default test;