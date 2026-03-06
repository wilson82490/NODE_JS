

import { validateStock, validatePrice } from "../utils/validate.js";

import Product from "../models/Product.js";

const products =[
    {id: 1, name: "laptop", price: 1200, stock: 10},
    {id: 2, name: "mouse", price: 20, stock: 100},
    ];


export const getProducts = async (req,res)=>{
  const products = await Product.find();
  console.log(products);
    res.json();
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


 export const createProduct = async (req, res)=>{

//Validación del campo stock

  /* console.log(validateStock(req.body.stock));
 */
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

    if(!validatePrice(req.body.price)){
       return res.status(422).json({ error: "Invalid price" });
    }

  const data = {
    //id: Date.now(),
    name: req.body.name,
    price: Number(req.body.price),
    stock: Number(req.body.stock)
  };
  const product = new Product(data);
    await product.save();

   // products.push(newProduct)

    res.status(201).json(product);
 }


 export const updateProduct = (req, res)=>{
  const id = Number(req.params.id)
  if(isNaN(id)){
    return res.status(400).json({error: "invalid id"})
}
const product = products.find((p)=>{p.id == id});
if(!product){
    return res.status(404).json({error: "product not found"})
  }

  console.log(product);
  console.log(req.body);


  const {name, price, stock} = req.body

  req.send("ok")
 }



 export const deleteProduct = (req, res)=>{
  const id = Number(req.params.id)
  if(isNaN(id)){
    return res.status(400).json({error: "invalid id"})
}
const productIndex = products.findIndex((p)=> p.id == id);
if(productIndex === -1){
    return res.status(404).json({error: "product not found"})
}
products.splice(productIndex, 1);
res.status(204).send();
res.json({message: "product deleted"})
}


export const searchProducts = async (req, res)=>{
  const {name} = req.query;
  if(!name){
    return res.status(422).json({error: "name query is required"})
  }

  const products = await Product.find(
   {name: {$regex: name, $options: "i"}}
  );

  res.json(products)
};