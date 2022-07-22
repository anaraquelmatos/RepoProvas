import { Router } from "express";
import { SignUp } from "../controllers/authController.js";
import verifyUserDataSignUp from "../middlewares/authMiddleware.js";

const auth = Router();

auth.post("/sign-up", verifyUserDataSignUp, SignUp);

export default auth;