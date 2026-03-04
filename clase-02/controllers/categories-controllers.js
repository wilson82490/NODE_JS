



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

export const getCategories = (req,res)=>{
    res.json(categories);
 };

    export const getCategoryById = (req, res)=>{

const id = parseInt(req.params.id);

if(isNaN(id)){
   return res.status(400).json({error: "invalid category"})
}

const category = categories.find((cat)=> cat.id == id);
 if(!category){
    return res.status(404).json({error: "category not found"})
  }

  res.json(category);
 };

 export const createCategory = (req, res)=>{
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
 };