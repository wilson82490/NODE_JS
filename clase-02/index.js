


import express from "express";
import pingRouter from "./routes/ping-router.js";
import productRouter from "./routes/products-router.js"

const app = express();

app.use(express.json());
app.use("/products", productRouter)
app.use(pingRouter)



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

 


app.listen(3000, ()=> console.log("http://localhost:3000"));

