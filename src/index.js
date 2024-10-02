import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";
// As early as possible in your application, import and configure dotenv:
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port :${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAIELD !!! ", err);
  });


