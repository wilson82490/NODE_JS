

import { validateStock, validatePrice } from "../utils/validate.js";

import Product from "../models/Product.js";


export const getProducts = async (req,res)=>{
  const products = await Product.find();
 
    res.json(products);
 };

 export const getProductById = async (req, res)=>{
  try {
     const {id} = req.params;

  const product = await Product.findById(id);

 if(!product){
    return res.status(404).json({error: "product not found"})
  }
    res.json(product);
  } catch (error) {
    res.status(404).json({error: "invalid product id"})
  }

 /*  const {id} = req.params;

  const product = await Product.findById(id);

  const id = parseInt(req.params.id);
  if(isNaN(id)){
      return res.status(400).json({error: "invalid id"})
  }

  const product = products.find((p)=> p.id == id);
 if(!product){
    return res.status(404).json({error: "product not found"})
  }
    res.json(product); */
 }


export const createProduct = async (req, res)=>{
try {
  /* //Validación del campo stock
  if(!validateStock(req.body.stock)){
    return res.status(422).json({error: "invalid stock"})
  }
// Validación del campo price
  if(!validatePrice(req.body.price)){
    return res.status(422).json({ error: "Invalid price" });
    } */
  /*  const data = {
    name: req.body.name,
    price: Number(req.body.price),
    stock: Number(req.body.stock)
  }; */
  const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);
} catch (error) {
  if(error.name === "ValidationError"){
    
    const errors = {};
    for (const property in error.errors) {
  //console.log(property, error.errors[property].message);
  errors[property] = error.errors[property].message;
}
    return res.status(422).json({error: errors});
  }

  res.status(500).json({error: "internal server error"});
}
};


/*  export const updateProduct = (req, res)=>{
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
 } */

export const updateProduct = async (req, res)=>{
 try {
   const {id} = req.params;

 /*   //Validación del campo stock

  if(!validateStock(req.body.stock)){
    return res.status(422).json({error: "invalid stock"})
  }
// Validación del campo price
  if(!validatePrice(req.body.price)){
    return res.status(422).json({ error: "Invalid price" });
    } */


    const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!productUpdate) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json(productUpdate);
 } catch (error) {
  
  if(error.name === "ValidationError"){
    res.status(422).json({error: error.errors})
  }

  if(error.name === "CastError"){
    return res.status(404).json({ error: "invalid product id" });
  }
  res.status(500).json({ error: "internal server error" });
 }
};

 /* export const deleteProduct = (req, res)=>{
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
} */


export const deleteProduct = async (req, res)=>{
 try {
   const {id} = req.params;

  const productDelete = await Product.findByIdAndDelete(id);

  if (!productDelete) {
    return res.status(404).json({ error: "product not found" });
  }

  res.status(204).send();
 } catch (error) {
   res.status(404).json({ error: "invalid product id" });
 }
};

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