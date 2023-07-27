import {Router} from 'express'
import * as review from './review.controller.js'
import { createReviewSchema, deleteReviewSchema, getReviewSchema, updateReviewSchema } from './review.validation.js'
import { validation } from '../../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const reviewRouter = Router()

reviewRouter.route('/').post(protectedRoutes,allowedTo('user'),validation(createReviewSchema) ,review.createReview).get(review.getAllReviews)
reviewRouter.route('/:id').get(validation(getReviewSchema) ,review.getReview).delete(validation(deleteReviewSchema),review.deleteReview).put(protectedRoutes,allowedTo('user'),validation(updateReviewSchema),review.updateReview)
export default reviewRouter