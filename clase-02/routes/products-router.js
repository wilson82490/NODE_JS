

import {Router} from "express"

const router = Router();

import { 
    createProduct, 
    getProductById, 
    getProducts, 
    updateProduct,
    deleteProduct} from "../controllers/products-controller.js";

const products =[
    {id: 1, name: "laptop", price: 1200, stock: 10},
    {id: 2, name: "mouse", price: 20, stock: 100},
    ];

//======PRODUCTS========//

 router.get("/", getProducts);
 router.get("/:id", getProductById );
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;