import {Router} from 'express'
import * as product from './product.controller.js'
import { uploadMixfile } from '../../../middleware/fileUpload.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
const productRouter = Router()

productRouter.route('/').post(protectedRoutes,allowedTo('admin'),uploadMixfile([ { name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 8 }],'product'),product.createProduct)
.get(product.getAllProducts)
productRouter.route('/:id').get(product.getProduct).put(allowedTo('admin'),product.updateProduct).delete(allowedTo('admin'),product.deleteProduct)
export default productRouter