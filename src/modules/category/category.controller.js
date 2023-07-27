 import categoryModel from "../../../dataBase/models/category.model.js"
import slugify from "slugify"
import { catchAsyncError } from "../../../middleware/catchAsyncError.js"
import { AppError } from "../../../utilits/AppError.js"
import * as factor from "../handelrs/factor.handlers.js"
import { ApiFeature } from "../../../utilits/AppFeature.js"




const createCategory = catchAsyncError( async(req,res,next)=>{
        const {name}=req.body
        req.body.slug = slugify(req.body.name)
         req.body.img = req.file.filename
        let result = await new categoryModel(req.body)
        await result.save()
        !result &&  next (new AppError(`Can't create this category`,404))
        result && res.json({messaeg:'success',result})
    }
)

const getAllCategories = catchAsyncError(async(req,res)=>{
    let apiFeature = new ApiFeature(categoryModel.find(),req.query).paginate().fields().filter().sort().search()

    const result = await apiFeature.mongoseQuery
    res.json({messaeg:'success',page:apiFeature.page,result})
})

const getCategories = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const result = await categoryModel.findById(id)
    !result && next((new AppError(`category not found`,404)))
    result && res.json({messaeg:'success',result})
} )  
const updateCategories = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    req.body.slug = slugify(req.body.name)
    req.body.img = req.file.filename
   const result = await categoryModel.findByIdAndUpdate(id,req.body,{new:true})
   !result && next (new AppError(`category not found`,404))
    result && res.json({messaeg:'success',result})
} )  

const deleteCategories = factor.deleteOne(categoryModel)

export {getAllCategories,getCategories,updateCategories,deleteCategories,createCategory}