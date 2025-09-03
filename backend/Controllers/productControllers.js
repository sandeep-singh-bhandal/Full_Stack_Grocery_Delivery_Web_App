import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../Models/Product.js";

//Add Product - api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    const images = req.files;

    let imagesData = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return { url: result.secure_url, publicId: result.public_id };
      })
    );

    await ProductModel.create({
      ...productData,
      imagesData,
    });

    res.json({ success: true, message: "Product Added Successfully" });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

//Delete Product - api/product/delete
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { imagesData } = req.body;

    await ProductModel.findByIdAndDelete(id);
    await Promise.all(
      imagesData.map(async (data) => {
        await cloudinary.uploader.destroy(data.publicId);
      })
    );

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
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
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    res.json({ success: true, product });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
//Update Product - api/product/update
export const updateProduct = async (req, res) => {
  console.log(req.files);

  // try {
  //   const { updatedProductData } = req.body;
  //   await ProductModel.findByIdAndUpdate(id, { updatedProductData });
  //   res.json({ success: true, message: "Product Updated" });
  // } catch (err) {
  //   console.log(err.message);
  //   res.json({ success: false, message: err.message });
  // }
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
