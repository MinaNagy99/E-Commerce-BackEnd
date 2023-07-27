import {Router} from 'express'
import { validation } from '../../../middleware/validation.js'
import { wishListSchema } from './wishList.validate.js'
import { addToWishList, getAllWishList, removeFromWishList } from './wishList.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
const wishListRouter = Router()

wishListRouter.route('/:id')
.patch(protectedRoutes,allowedTo('user'),validation(wishListSchema), addToWishList)
.delete(protectedRoutes,allowedTo('user'),validation(wishListSchema),removeFromWishList)

wishListRouter.route('/')
.get(protectedRoutes,allowedTo('user'),getAllWishList)

export default wishListRouter