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

const productRouter = Router();

productRouter.post("/add", upload.array(["images"], 5), authSeller, addProduct);
productRouter.get("/list", getProduct);
productRouter.get("/id/:id", getProductById);
productRouter.post("/delete/:id", deleteProduct);
productRouter.post("/stock", changeStock);
productRouter.patch("/update/:id", upload.array(["files"], 5), updateProduct);

export default productRouter;
