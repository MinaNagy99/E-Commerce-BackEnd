import {Router} from 'express'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import * as cart from './cart.controller.js'
const cartRouter = Router()

cartRouter.route('/:productId')
.post(protectedRoutes,allowedTo('user','admin'),cart.addCart)



export default cartRouter