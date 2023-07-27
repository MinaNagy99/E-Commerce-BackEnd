import slugify from "slugify"
import { catchAsyncError } from "../../../middleware/catchAsyncError.js"
import { AppError } from "../../../utilits/AppError.js"
import brandModel from "../../../dataBase/models/brands.model.js"
import { ApiFeature } from "../../../utilits/AppFeature.js"




const createBrand = catchAsyncError( async(req,res,next)=>{
        req.body.slug = slugify(req.body.name)
        req.body.logo = req.file.filename
        let result = await brandModel.create(req.body)
        !result &&  next (new AppError(`Can't create this brand`,404))
        result && res.json({messaeg:'success',result})
    }
)

const getAllBrands = catchAsyncError(async(req,res)=>{
    let apiFeature = new ApiFeature(brandModel.find(),req.query).paginate().fields().filter().sort().search()

    const result = await apiFeature.mongoseQuery
    res.json({messaeg:'success',page:apiFeature.page,result})
})

const getBrand = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const result = await brandModel.findById(id)
    !result && next((new AppError(`Brand not found`,404)))
    result && res.json({messaeg:'success',result})
} )  
const updateBrand = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
   const result = await brandModel.findByIdAndUpdate(id,req.body,{new:true})
   !result && next (new AppError(`Brand not found`,404))
    result && res.json({messaeg:'success',result})
} )  

const deleteBrand = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const result = await brandModel.findByIdAndDelete(id)
    !result && next (new AppError(`Brand not found`,404))
    result && res.json({messaeg:'success',result})
} )  

export {getAllBrands,getBrand,updateBrand,deleteBrand,createBrand}