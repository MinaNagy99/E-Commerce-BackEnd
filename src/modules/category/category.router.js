import {Router} from 'express'
import { createCategory, deleteCategories, getAllCategories, getCategories, updateCategories } from './category.controller.js'
import subcategoryRouter from '../subCategroy/subCategory.router.js'
import { validation } from '../../../middleware/validation.js'
import { createCategorySchema, deleteCategorySchema, getCategorySchema, updateCategorySchema } from './category.validate.js'
import { uploadSingleFile } from '../../../middleware/fileUpload.js'
import { allowedTo } from '../auth/auth.controller.js'
const categoryRouter = Router()

categoryRouter.route('/').post(allowedTo('admin'),uploadSingleFile("img","category"),validation(createCategorySchema),createCategory).get(getAllCategories)
categoryRouter.route('/:id').get(validation(getCategorySchema), getCategories).delete(allowedTo('admin'),validation(deleteCategorySchema), deleteCategories).put(allowedTo('admin'),uploadSingleFile("image","category"),validation(updateCategorySchema) ,updateCategories)
categoryRouter.use('/:categoryId/subcategories',subcategoryRouter)
export default categoryRouter