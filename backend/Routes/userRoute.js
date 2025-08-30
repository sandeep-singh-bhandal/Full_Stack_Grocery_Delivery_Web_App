import { Router } from "express";
import { login, register } from "../Controllers/userControllers.js";

const userRouter = Router();

userRouter.post('/register',register);
userRouter.post('/login',login);

export default userRouter;
