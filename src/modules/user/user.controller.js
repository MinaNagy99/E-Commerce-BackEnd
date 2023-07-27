import { catchAsyncError } from "../../../middleware/catchAsyncError.js"
import { AppError } from "../../../utilits/AppError.js"
import * as factor from "../handelrs/factor.handlers.js"
import { ApiFeature } from "../../../utilits/AppFeature.js"
import userModel from "../../../dataBase/models/user.model.js"




const createUser = catchAsyncError( async(req,res,next)=>{
        let user = await userModel.findOne({email:req.body.email})
        if (user) return next(new AppError('user already existed',409))

        let result = await new userModel(req.body)
        await result.save()
                
        !result &&  next (new AppError(`Can't create this User`,404))
        result && res.json({messaeg:'success',result})
    }
)

const getAllUsers = catchAsyncError(async(req,res)=>{
    let apiFeature = new ApiFeature(userModel.find(),req.query).paginate().fields().filter().sort().search()
    const result = await apiFeature.mongoseQuery
    res.json({messaeg:'success',page:apiFeature.page,result})
})

const getUser = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    console.log(id);
    const result = await userModel.findById(id)
    !result && next((new AppError(`User not found`,404)))
    result && res.json({messaeg:'success',result})
} )  
const updateUser = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
   const result = await userModel.findByIdAndUpdate(id,req.body,{new:true})
   !result && next (new AppError(`User not found`,404))
    result && res.json({messaeg:'success',result})
} )  
const changeUserPassword = catchAsyncError(async(req,res,next)=>{
    const {id} =req.params

    const user = await userModel.findById(id)
    if(!user) next(new AppError('user not found',404))
    user.password=req.body.password
    user.changePasswordAt = Date.now()
   await  user.save()
    res.json({messaeg:'success',user})
})

const deleteUser = factor.deleteOne(userModel)



export {getAllUsers,getUser,updateUser,deleteUser,createUser,changeUserPassword}