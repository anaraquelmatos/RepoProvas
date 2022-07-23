import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import verifyUser from "../middlewares/authMiddleware.js";

const auth = Router();

auth.post("/sign-up", verifyUser.verifyUserDataSignUp, signUp);
auth.post("/sign-in", verifyUser.verifyUserDataSignIn, signIn);

export default auth;