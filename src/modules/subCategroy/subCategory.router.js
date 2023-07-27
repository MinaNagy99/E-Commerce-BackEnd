import {Router} from 'express'
import { createSubCategory, deleteSubCategories, getAllSubCategories, getSubCategory, updateSubCategories } from './subCategory.controller.js'

const subcategoryRouter = Router({mergeParams:true})

subcategoryRouter.route('/').post(createSubCategory).get(getAllSubCategories)
subcategoryRouter.route('/:id').get(getSubCategory).delete(deleteSubCategories).put(updateSubCategories)

export default subcategoryRouter