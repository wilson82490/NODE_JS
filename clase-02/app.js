import dotenv from "dotenv";
dotenv.config();

import express from "express";
import pingRouter from "./routes/ping-router.js";
import productRouter from "./routes/products-router.js"
import categoriesRouter from "./routes/categories-router.js"
import mongoose from "mongoose";
import categoryTypeRouter from "./routes/categoryType.router.js";
const app = express();

console.log(process.env.MONGODB_URI);

mongoose
.connect(process.env.MONGODB_URI)
.then(()=> console.log("connected to MongoDB"))
.catch((error)=> console.log(error));

app.use(express.json());

app.use("/products", productRouter)
app.use("/categories", categoriesRouter)
app.use(pingRouter);
app.use(categoryTypeRouter);

export default app;