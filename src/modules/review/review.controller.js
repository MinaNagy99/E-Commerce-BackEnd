import slugify from "slugify"
import { catchAsyncError } from "../../../middleware/catchAsyncError.js"
import { AppError } from "../../../utilits/AppError.js"
import brandModel from "../../../dataBase/models/brands.model.js"
import { ApiFeature } from "../../../utilits/AppFeature.js"
import reviewModel from "../../../dataBase/models/review.model.js"




const createReview = catchAsyncError( async(req,res,next)=>{
        req.body.userId=req.user._id
        let isReview = await reviewModel.findOne({userId:req.user._id,productId:req.body.productId})
        if (!isReview) {
            let result = await reviewModel.create(req.body)
            !result &&  next (new AppError(`Can't create this Review`,404))
            result && res.json({messaeg:'success',result})
        }else{
            next(new AppError('you created review before',409))
        }
      
    }
)

const getAllReviews = catchAsyncError(async(req,res)=>{
    let apiFeature = new ApiFeature(reviewModel.find(),req.query).paginate().fields().filter().sort().search()

    const result = await apiFeature.mongoseQuery
    res.json({messaeg:'success',page:apiFeature.page,result})
})

const getReview = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const result = await reviewModel.findById(id)
    !result && next((new AppError(`Review not found`,404)))
    result && res.json({messaeg:'success',result})
} )  
const updateReview = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params

   const result = await reviewModel.findOneAndUpdate({_id:id,userId:req.user._id},req.body,{new:true})
   !result && next (new AppError(`Review not found or you are not authorized`,404))
    result && res.json({messaeg:'success',result})
} )  

const deleteReview = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const result = await reviewModel.findByIdAndDelete(id)
    !result && next (new AppError(`Review not found`,404))
    result && res.json({messaeg:'success',result})
} )  

export {getAllReviews,getReview,updateReview,deleteReview,createReview}