

import Category from "../models/Category.js";



export const getCategories = async (req,res)=>{
  const categories = await Category.find();
  console.log(categories);
    res.json(categories);
 };

export const getCategoryById = async (req, res)=>{
  try {
     const {id} = req.params;
     const category = await Category.findById(id);
 if(!category){
    return res.status(404).json({error: "category not found"})
  }

  res.json(category);
  } catch (error) {
    res.status(404).json({error: "Invalid category id"})
  }
 };

 export const createCategory = async (req, res)=>{
 if(!req.body.name ){
    return res.status(422).json({error: "name is required"})
  }

  const data = {
    
    name: req.body.name,
    description: req.body.description,
  };
    
  const category = new Category(data);

  await category.save();

    res.status(201).json(category);
 };


/* export const updateCategory = (req, res)=>{
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
 */

export const updateCategory = async (req, res)=>{
 try {
   const {id} = req.params;

   if(!req.body.name){
    return res.status(422).json({error: "name is required"})
  }

  const categoryUpdate = await Category.findByIdAndUpdate(id, req.body, {
    returnDocument: "after"
  });

  if (!categoryUpdate) {
    return res.status(404).json({ error: "category not found" });
  }
  res.json(categoryUpdate);
 } catch (error) {
  res.status(404).json({ error: "invalid category id" });
 }
};


/*  export const deleteCategory = (req, res) => {
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
} */


  export const deleteCategory = async (req, res)=>{
   try {
     const {id} = req.params;
  
    const categoryDelete = await Category.findByIdAndDelete(id);

    if (!categoryDelete) {
    return res.status(404).json({ error: "category not found" });
  }
  
    res.status(204).send();
   } catch (error) {
      res.status(404).json({ error: "invalid category id" });
   }
  };

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