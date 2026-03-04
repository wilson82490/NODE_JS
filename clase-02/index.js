


import express from "express";
import pingRouter from "./routes/ping-router.js";
import productRouter from "./routes/products-router.js"
import categoriesRouter from "./routes/categories-router.js"

const app = express();

app.use(express.json());
app.use("/products", productRouter)
app.use("/categories", categoriesRouter)
app.use(pingRouter)


app.listen(3000, ()=> console.log("http://localhost:3000"));

