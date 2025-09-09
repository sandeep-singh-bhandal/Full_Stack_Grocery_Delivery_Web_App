import { Router } from "express";
import {
  deleteAccount,
  getUserById,
  isAuth,
  login,
  logout,
  register,
  updateUser,
} from "../Controllers/userControllers.js";
import { authUser } from "../Middlewares/authUser.js";
import {
  loginValidator,
  registerValidator,
  updateDetailsValidator,
} from "../Middlewares/authValidator.js";

const userRouter = Router();

userRouter.post("/register", registerValidator, register);
userRouter.post("/login", loginValidator, login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logout);
userRouter.delete("/delete", authUser, deleteAccount);
userRouter.get("/get-user", authUser, getUserById);
userRouter.patch("/update-user", authUser, updateDetailsValidator, updateUser);

export default userRouter;
