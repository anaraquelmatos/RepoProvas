import { Router } from "express";
import { SignIn, SignUp } from "../controllers/authController.js";
import verifyUser from "../middlewares/authMiddleware.js";

const auth = Router();

auth.post("/sign-up", verifyUser.verifyUserDataSignUp, SignUp);
auth.post("/sign-in", verifyUser.verifyUserDataSignIn, SignIn);

export default auth;