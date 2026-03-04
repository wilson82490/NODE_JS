

/* import * as http from "node:http";

const server = http.createServer((request, response)=>{
  

    if (request.url == "/ping"){
        response.statusCode =200;
        response.setHeader("Content-type", "application/json");
        response.end(JSON.stringify({message: "pong"}));
        return;
    }

        response.statusCode = 404;
        response.setHeader("Content-type", "application/json");
        response.end(JSON.stringify({message: "Not found"}));
});


server.listen(3000, ()=> console.log("http://localhost:3000")); */


import express from "express";

const app = express();

app.use(express.json());

const products =[
    {id: 1, name: "laptop", price: 1200},
    {id: 2, name: "mouse", price: 20}
    ];

const categories = [
  {
    id: 1,
    name: "Electro",
    description: "Lorem ipsum",
  },
  {
    id: 2,
    name: "Bazar",
    description: "Lorem ipsum bazar",
  },
];

//======PRODUCTS========//

 app.get("/products",(req,res)=>{
    res.json(products);
 });
 
 app.get("/products/:id", (req, res)=>{


//const id = Number(req.params.id);
const id = parseInt(req.params.id);

if(isNaN(id)){
    return res.status(400).json({error: "invalid id"})
}

const product = products.find((p)=> p.id == id);

  if(!product){
    return res.status(404).json({error: "product not found"})
  }
    res.json(product);
 });


 app.post("/products",(req, res)=>{

    

  // Validación del campo price

  
  //const { name, price } = req.body;
  /* if (price === undefined || typeof price !== "number" || price < 0) {
    return res.status(422).json({ error: "Invalid price" });
  } */
  if (!req.body.price || req.body.price < 0) {
    return res.status(422).json({ error: "Invalid price" });
  }

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
  };


  products.push(newProduct);

    res.status(201).json(newProduct);
 })


//=======CATEGORIES========//

app.get("/categories",(req,res)=>{
    res.json(categories);
 });

 app.get("/categories/:id", (req, res)=>{

const id = parseInt(req.params.id);

if(isNaN(id)){
    return res.status(400).json({error: "invalid category"})
}

    const category = categories.find((cat)=> cat.id == id);
 if(!category){
    return res.status(404).json({error: "category not found"})
  }

  res.json(category);
 });


 app.post("/categories",(req, res)=>{

  if(req.body.name == undefined || req.body.name == ""){
    return res.status(422).json({error: "name is required"})
  }

  const newCategory = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
  };


  categories.push(newCategory);

    res.status(201).json(newCategory);
 })

 
app.get("/ping", (req, res)=>{
    res.json({message: "pong"});
});

app.listen(3000, ()=> console.log("http://localhost:3000"));

