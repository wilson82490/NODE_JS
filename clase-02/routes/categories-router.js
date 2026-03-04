

import {Router} from "express"
import { 
    createCategory, 
    getCategories, 
    getCategoryById } from "../controllers/categories-controllers.js";

const router = Router();


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

router.get("/",getCategories);

router.get("/:id", getCategoryById);


 router.post("/",createCategory);

 export default router;