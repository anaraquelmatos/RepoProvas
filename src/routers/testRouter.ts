import { Router } from "express";
import { registerTest } from "../controllers/testController.js";
import { verifySessionError } from "../middlewares/sessionMiddleware.js";
import { verifyTestData } from "../middlewares/testMiddleware.js";

const test = Router();

test.post("/test", verifySessionError, verifyTestData, registerTest);

export default test;