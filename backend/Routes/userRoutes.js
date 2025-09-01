import { Router } from "express";
import { deleteAccount, isAuth, login, logout, register } from "../Controllers/userControllers.js";
import { authUser } from "../Middlewares/authUser.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout",authUser, logout);
userRouter.delete("/delete",authUser, deleteAccount);

export default userRouter;
