import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../Models/Product.js";

//Add Product - api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    const images = req.files;

    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    await ProductModel.create({ ...productData, image: imagesUrl });

    res.json({ success: true, message: "Product Added Successfully" });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
//get Products - api/product/list
export const getProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json({ success: true, products });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
//Get Single Product - api/product/id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await ProductModel.findById(id);
    res.json({ success: true, product });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
//Change Product inStock - api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await ProductModel.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
