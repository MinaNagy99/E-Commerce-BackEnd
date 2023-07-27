import { json } from "express"
import slugify from "slugify"
import { catchAsyncError } from "../../../middleware/catchAsyncError.js"
import { AppError } from "../../../utilits/AppError.js"
import subcategoryModel from "../../../dataBase/models/subCategory.model.js"
import { deleteOne } from "../handelrs/factor.handlers.js"

const createSubCategory = catchAsyncError(async(req,res,next)=>{
    const {name,categoryID}=req.body
    const subCategory= await subcategoryModel.insertMany({name,slug:slugify(name),categoryID})
  res.json({messaeg:'subcategory',subCategory})
})

const getAllSubCategories = catchAsyncError(async(req,res,next)=>{
    let filter ={}
    if (req.params.categoryId) {
        filter={categoryID:req.params.categoryId}
    }
    const result = await subcategoryModel.find(filter)
    console.log(req.params);
    ! result && next(new AppError("not found any subCategory",404))
    result && res.json({messaeg:'success',result})})

    
const getSubCategory = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const result = await subcategoryModel.findById(id)
    ! result && next(new AppError("subCategory not found",404))
    result && res.json({messaeg:'success',result})
}   )
const updateSubCategories = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const {name} =req.body
   const result = await subcategoryModel.findByIdAndUpdate({_id:id},{name,slug:slugify(name)},{new:true})
   ! result && next(new AppError("subCategory not found",404))
   result && res.json({messaeg:'success',result})}   )

const deleteSubCategories = deleteOne(subcategoryModel)

export {getAllSubCategories,getSubCategory,updateSubCategories,deleteSubCategories,createSubCategory}