

import { validateStock, validatePrice } from "../utils/validate.js";

const products =[
    {id: 1, name: "laptop", price: 1200, stock: 10},
    {id: 2, name: "mouse", price: 20, stock: 100},
    ];


export const getProducts = (req,res)=>{
    res.json(products);
 };

 export const getProductById = (req, res)=>{

const id = parseInt(req.params.id);
if(isNaN(id)){
    return res.status(400).json({error: "invalid id"})
}

const product = products.find((p)=> p.id == id);
 if(!product){
    return res.status(404).json({error: "product not found"})
  }
    res.json(product);
 }


 export const createProduct = (req, res)=>{

//Validación del campo stock

  console.log(validateStock(req.body.stock));

    /* if(req.body.stock == undefined || 
      isNaN(req.body.stock) || 
      req.body.stock < 0
    ){
      return res.status(422).json({error: "invalid stock"})
    } */

  //if(validateStock(req.body.stock)== false)
  if(!validateStock(req.body.stock)){
    return res.status(422).json({error: "invalid stock"})
  }



  // Validación del campo price

  console.log(validatePrice(req.body.price));
  
  /* if (!req.body.price || req.body.price < 0) {
    return res.status(422).json({ error: "Invalid price" });
  } */

    if(!validatePrice(eq.body.price)){
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
 }