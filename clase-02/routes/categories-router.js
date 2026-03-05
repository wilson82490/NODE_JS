

import {Router} from "express"
import { 
  createCategory, 
  getCategories, 
  getCategoryById,
  updateCategory,
  deleteCategory } from "../controllers/categories-controllers.js";

const router = Router();





//=======CATEGORIES========//

router.get("/",getCategories);
router.get("/:id", getCategoryById);
router.post("/",createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

 export default router;