

import {Router} from "express"

const router = Router();

import { 
    createProduct, 
    getProductById, 
    getProducts, 
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategoryID
                 } from "../controllers/products-controller.js";



//======PRODUCTS========//
router.get("/search",searchProducts);
router.get("/", getProducts);
router.get("/:id", getProductById );
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.get("/category/:categoryId", getProductsByCategoryID);



export default router;