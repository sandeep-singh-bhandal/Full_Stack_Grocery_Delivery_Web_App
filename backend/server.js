import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDatabase from "./Config/db.js";
import userRouter from "./Routes/userRoutes.js";
import sellerRouter from "./Routes/sellerRoutes.js";
import { connectCloudinary } from "./Config/cloudinary.js";
import productRouter from "./Routes/productRoutes.js";
import { cartRouter } from "./Routes/cartRoutes.js";
import { addressRouter } from "./Routes/addressRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Allowed URLs to access the backend
const allowedOrigins = ["http://localhost:5173"];

// Connecting To Mongo DB
await connectDatabase();

// Connecting To Cloudinary
await connectCloudinary();

// Middleware Configurations
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
