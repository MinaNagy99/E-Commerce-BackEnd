import { catchAsyncError } from "../../../middleware/catchAsyncError.js"
import { AppError } from "../../../utilits/AppError.js"


export const deleteOne = (model)=>{
return catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const result = await model.findByIdAndDelete(id)
    !result && next (new AppError(`document not found`,404))
    result && res.json({messaeg:'success',result})
} )  

}