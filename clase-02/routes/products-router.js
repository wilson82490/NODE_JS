

import {Router} from "express"

const router = Router();

import { getProducts } from "../controllers/products-controller";

const products =[
    {id: 1, name: "laptop", price: 1200, stock: 10},
    {id: 2, name: "mouse", price: 20, stock: 100},
    ];

//======PRODUCTS========//

 router.get("/", getProducts);
 
 router.get("/:id", );


router.post("/",(req, res)=>{
console.log(req.body,req.body.stock,isNaN(req.body.stock));

    if(req.body.stock == undefined || isNaN(req.body.stock) || req.body.stock < 0){
          return res.status(422).json({error: "invalid stock"})
        }
  
    

  // Validación del campo price
  if (!req.body.price || req.body.price < 0) {
    return res.status(422).json({ error: "Invalid price" });
  }

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  };


  products.push(newProduct);

    res.status(201).json(newProduct);
 })


export default router;