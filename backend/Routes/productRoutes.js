import { Router } from "express";
import {
  addProduct,
  changeStock,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "../Controllers/productControllers.js";
import { upload } from "../Config/multer.js";
import { authSeller } from "../Middlewares/authSeller.js";
import { productValidator } from "../Middlewares/productValidation.js";

const productRouter = Router();

productRouter.post(
  "/add",
  upload.array(["files"], 5),
  productValidator,
  authSeller,
  addProduct
);
productRouter.get("/list", getProduct);
productRouter.get("/id/:id", getProductById);
productRouter.post("/delete/:id", deleteProduct);
productRouter.post("/stock", changeStock);
productRouter.put(
  "/update/:id",
  upload.array(["files"], 5),
  productValidator,
  updateProduct
);

export default productRouter;
