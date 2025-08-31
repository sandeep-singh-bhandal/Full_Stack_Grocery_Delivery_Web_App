import { Router } from "express";
import { authUser } from "../Middlewares/authUser.js";
import { updateCart } from "../Controllers/cartController.js";

export const cartRouter = Router();

cartRouter.post('/update',authUser,updateCart)
