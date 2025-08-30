import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDatabase from "./Config/db.js";
import userRouter from "./Routes/userRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Allowed URLs to access the backend
const allowedOrigins = ["https://localhost:5173"];

// Connecting To Mongo DB
await connectDatabase();

// Middleware Configurations
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Server Chalpeya Oyee!!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
