import {Router} from 'express'
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from './brand.controller.js'
import { validation } from '../../../middleware/validation.js'
import { createbrandSchema, deleteBrandSchema, getBarndSchema, updateBarndSchema } from './brand.validation.js'
import { uploadSingleFile } from '../../../middleware/fileUpload.js'
import { allowedTo } from '../auth/auth.controller.js'

const brandRouter = Router()

brandRouter.route('/').post(allowedTo('admin'),uploadSingleFile("logo","brand"),validation(createbrandSchema) ,createBrand).get(getAllBrands)
brandRouter.route('/:id').get(validation(getBarndSchema), getBrand).delete(allowedTo('admin'),validation(deleteBrandSchema), deleteBrand).put(allowedTo('admin'),validation(updateBarndSchema), updateBrand)
export default brandRouter