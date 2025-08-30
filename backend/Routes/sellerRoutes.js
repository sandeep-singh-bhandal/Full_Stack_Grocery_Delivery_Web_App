import { Router } from "express";
import { isSellerAuth, sellerLogin, sellerLogout } from "../Controllers/sellerControllers.js";
import { authSeller } from "../Middlewares/authSeller.js";

const sellerRouter = Router();

sellerRouter.post('/login',sellerLogin)
sellerRouter.get('/is-auth',authSeller,isSellerAuth)
sellerRouter.get('/login',sellerLogout)

export default sellerRouter;