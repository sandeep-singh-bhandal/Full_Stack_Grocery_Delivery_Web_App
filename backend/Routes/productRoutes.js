import { Router } from "express";
import { addProduct, changeStock, getProduct, getProductById } from "../Controllers/productControllers.js";
import { upload } from "../Config/multer.js";
import {authSeller} from "../Middlewares/authSeller.js"

const productRouter = Router();

productRouter.post("/add", upload.array(["images"], 5), authSeller, addProduct);
productRouter.get("/list",  getProduct);
productRouter.get("/id",  getProductById);
productRouter.post("/stock",  changeStock);

export default productRouter;

