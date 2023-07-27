
import  jwt  from "jsonwebtoken"
import userModel from "../../../dataBase/models/user.model.js"
import bcrypt from 'bcrypt'
import { catchAsyncError } from "../../../middleware/catchAsyncError.js"
import { AppError } from "../../../utilits/AppError.js"
import { changeUserPassword } from "../user/user.controller.js"


export const signIn = catchAsyncError(async(req,res,next)=>{
    let {email,password} = req.body
    let user = await userModel.findOne({email})
    let match = await bcrypt.compare(password,user.password)
    if (user&&match) {
        let token = jwt.sign({name:user.name,userId:user._id,role:user.role},'mynameismina')
        res.json({message:'success',token})
    }
    next( new AppError("incorrect email or password "))
})

export const protectedRoutes = catchAsyncError(async(req,res,next)=>{
    let {token}= req.headers
    if (!token) return next(new AppError('token nor provider',401))
    let decoded = await jwt.verify(token,'mynameismina')
    let user = await userModel.findById(decoded.userId)
    if(user.changePasswordAt){
        let changePasswordDate = parseInt(user.changePasswordAt.getTime()/1000)
        if(!user || decoded.iat<changePasswordDate) return next(new AppError('invalid token',404))
    }
    req.user = user
    next()
    
})

export const allowedTo = (...role)=>{

    return catchAsyncError(async(req,res,next)=>{
        if(!role.includes(req.user.role)) return next(new AppError(`you are not authorized you are ${req.user.role}`,401))

        next()
    })
}