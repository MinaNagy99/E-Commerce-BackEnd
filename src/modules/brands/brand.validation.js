import Joi from "joi";




export const  createbrandSchema= Joi.object({
    name:Joi.string().min(2).max(15).required()
})

export const getBarndSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateBarndSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    name:Joi.string().min(2).max(15).required()

})

export const deleteBrandSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),

})