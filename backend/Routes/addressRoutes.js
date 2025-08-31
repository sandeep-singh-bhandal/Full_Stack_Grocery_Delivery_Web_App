import { Router } from "express";
import { addAddress, getAddress } from "../Controllers/addressController.js";
import { authUser } from "../Middlewares/authUser.js";

export const addressRouter = Router();

addressRouter.post('/add',authUser,addAddress)
addressRouter.get('/get',authUser,getAddress)
