import Joi from "joi";




export const  createReviewSchema= Joi.object({
    comment:Joi.string().min(2).max(100),
    rating:Joi.number().min(0).max(5),
    productId:Joi.string().hex().length(24).required()
})

export const getReviewSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateReviewSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    comment:Joi.string().min(2).max(100),
    rating:Joi.number().min(0).max(5)
})

export const deleteReviewSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),

})