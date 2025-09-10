import { Router } from "express";
import {
  deleteAccount,
  getUserById,
  isAuth,
  login,
  logout,
  register,
  requestCode,
  resetPassword,
  updateUser,
  verifyCode,
} from "../Controllers/userControllers.js";
import { authUser } from "../Middlewares/authUser.js";
import {
  loginValidator,
  newPasswordValidator,
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
userRouter.post("/request-code", authUser, requestCode);
userRouter.post("/verify-code", authUser, verifyCode);
userRouter.post(
  "/reset-password",
  authUser,
  newPasswordValidator,
  resetPassword
);

export default userRouter;
