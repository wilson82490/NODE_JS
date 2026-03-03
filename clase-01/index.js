


import * as http from "node:http";


const products =[
    {id: 1, name: "laptop", price: 1200},
    {id: 2, name: "mouse", price: 20}
    ];


const categories = [
    {id: 1, name: "electronics"},
    {id: 2, name: "accessories"}
];

const server = http.createServer((req, res) =>{
    console.log(req.url)
    

    if(req.url == "/"){
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({message: "API running"}));
    return;
   }
    if(req.url == "/ping"){
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({message: "pong"}));
    return;
   }
  
// Productos
    if(req.url == "/products"){
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(products));
    return;
   }
   if(req.url.startsWith("/products/")){
   const id = Number (req.url.split("/")[2]);
   const product = products.find( p => p.id == id);

   if (!product){
    res.statusCode = 404;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({message: "producto no encontrado"}));
    return;
   }
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(product));
    return;
  
   };
 // Categories
   if (req.url == "/categories"){
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(categories));
   }

  
  if(req.url.startsWith("/categories/")){
   const id = Number (req.url.split("/")[2]);
   const category = categories.find( (cat) => cat.id == id);

   if (!category){
    res.statusCode = 404;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({message: "categoria no encontrada"}));
    return;
   }
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(category));
    return;
  
   };
   
   res.statusCode = 404;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({message: "Not found"}));
    
});

server.listen(3000, ()=>{
    console.log("http://localhost:3000");
});