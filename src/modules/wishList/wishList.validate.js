import Joi from "joi";





export const wishListSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

