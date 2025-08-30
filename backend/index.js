import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import User from "./Models/User.js";

const app = express();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(2000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
