import { Router } from "express";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
} from "../Controllers/orderControllers.js";
import { authUser } from "../Middlewares/authUser.js";

export const orderRouter = Router();

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authUser, getAllOrders);
