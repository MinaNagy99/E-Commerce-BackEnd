import { catchAsyncError } from "../../../middleware/catchAsyncError.js"
import { AppError } from "../../../utilits/AppError.js"
import userModel from "../../../dataBase/models/user.model.js"




 
export const addToWishList = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
   const result = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishList:id}},{new:true})
   !result && next (new AppError(`can't add to wishList`,404))
    result && res.json({messaeg:'success',result:result.wishList})
} )  

export const removeFromWishList = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
   const result = await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishList:id}},{new:true})
   !result && next (new AppError(`can't remove from wishList`,404))
    result && res.json({messaeg:'success',result:result.wishList})
} )
export const getAllWishList = catchAsyncError(async(req,res,next)=>{
   const result = await userModel.findById(req.user._id).populate('wishList')
   !result && next (new AppError(`can't found wishList`,404))
    result && res.json({messaeg:'success',result:result.wishList})
} )

 


