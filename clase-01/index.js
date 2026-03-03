


import * as http from "node:http";

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
    if(req.url == "/products"){
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({message: "lista de productos"}));
    return;
   }
   
    res.statusCode = 404;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({message: "Not found"}));
    
});

server.listen(3000, ()=>{
    console.log("http://localhost:3000")
});