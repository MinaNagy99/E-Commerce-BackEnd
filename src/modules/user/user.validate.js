import Joi from "joi";




export const  createUserSchema= Joi.object({
    name:Joi.string().min(2).max(15).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(5).max(25).required(),
    role:Joi.string().pattern(new RegExp('^admin||user$')),

})

export const getUserSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateUserSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    name:Joi.string().min(2).max(15),
    password:Joi.string().min(5).max(25)


})
export const deleteUserSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),

})
export const changeUserpasswordSchema =Joi.object({
    id:Joi.string().hex().length(24).required(),
    password:Joi.string().min(5).max(25)

})