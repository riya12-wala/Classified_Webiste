import express from "express"
import { addCategory,addSubCategory,addNestedCategory,getCategories ,getSubCategories,getNestedCategories, deleteCategory,updateCategory,subCategoriesAll,deleteSubCategory} from "../controller/categoryfinal.controller.js"


const router = express.Router();

router.post('/add-category1',addCategory)
router.post('/sub-category1',addSubCategory)
router.post('/nested-category1', addNestedCategory)
router.get('/get-categories1/', getCategories)
router.get('/get-allsub',subCategoriesAll)  //
router.get('/sub-categories1/:id?',getSubCategories)
router.get('/nested-categories1', getNestedCategories)
router.delete('/delete-category1/:id', deleteCategory)
router.delete('/delete-subcategory1/:id', deleteSubCategory)
router.put('/update-category1/:id', updateCategory)

export default router;