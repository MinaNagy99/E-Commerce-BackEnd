import {Router} from 'express'
import { validation } from '../../../middleware/validation.js'
import { changeUserPassword, createUser, deleteUser, getAllUsers, getUser, updateUser } from './user.controller.js'
import { changeUserpasswordSchema, createUserSchema, deleteUserSchema, getUserSchema, updateUserSchema } from './user.validate.js'
const userRouter = Router()

userRouter.route('/')
.post(validation(createUserSchema),createUser)
.get(getAllUsers)
userRouter.route('/:id')
.get(validation(getUserSchema),getUser)
.delete(validation(deleteUserSchema), deleteUser)
.put(validation(updateUserSchema) ,updateUser)
.patch(validation(changeUserpasswordSchema),changeUserPassword)
export default userRouter