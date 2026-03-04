

const products =[
    {id: 1, name: "laptop", price: 1200, stock: 10},
    {id: 2, name: "mouse", price: 20, stock: 100},
    ];


export const getProducts = (req,res)=>{
    res.json(products);
 };

 const getProductById = (req, res)=>{

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