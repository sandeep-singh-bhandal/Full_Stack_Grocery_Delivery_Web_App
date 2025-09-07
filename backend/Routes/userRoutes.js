import { Router } from "express";
import {
  deleteAccount,
  getUserById,
  isAuth,
  login,
  logout,
  register,
} from "../Controllers/userControllers.js";
import { authUser } from "../Middlewares/authUser.js";
import {
  loginValidator,
  registerValidator,
} from "../Middlewares/authValidator.js";

const userRouter = Router();

userRouter.post("/register", registerValidator, register);
userRouter.post("/login", loginValidator, login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logout);
userRouter.delete("/delete", authUser, deleteAccount);
userRouter.get("/get-user", authUser, getUserById);

export default userRouter;
