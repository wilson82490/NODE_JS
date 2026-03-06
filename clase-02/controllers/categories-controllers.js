



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

export const getCategories = async (req,res)=>{
  const categories = await Category.find();
  console.log(categories);
    res.json();
 };

export const getCategoryById = (req, res)=>{

const id = Number(req.params.id);

if(Number.isNaN(id)){
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

export const updateCategory = (req, res)=>{
  const id = Number(req.params.id)
  if(isNaN(id)){
    return res.status(400).json({error: "invalid id"})
}
const category = categories.find((cat)=> cat.id == id);
if(!category){
    return res.status(404).json({error: "category not found"})
  }

  console.log(category);
  console.log(req.body);


const {name, description} = req.body;

if(!name){
    return res.status(422).json({error: "name is required"})
  }
  category.name = name;
  category.description = description;

  res.json(category);
 }


 export const deleteCategory = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid category ID" });
  } 
  const categoryIndex = categories.findIndex((cat) => cat.id === id);

  if (categoryIndex === -1) {
    return res.status(404).json({ error: "Category not found" });
  }  
  categories.splice(categoryIndex, 1);

  res.status(204).send();
}


export const searchCategories = async (req, res)=>{
  const {name} = req.query;
  if(!name){
    return res.status(422).json({error: " category name is required"})
  }

  const categories = await Category.find(
   {name: {$regex: name, $options: "i"}}
  );

  res.json(categories)
};