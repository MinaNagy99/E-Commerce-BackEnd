import slugify from "slugify"
import { catchAsyncError } from "../../../middleware/catchAsyncError.js"
import { AppError } from "../../../utilits/AppError.js"
import productModel from "../../../dataBase/models/product.model.js"
import { ApiFeature } from "../../../utilits/AppFeature.js"




const createProduct = catchAsyncError( async(req,res,next)=>{
        req.body.slug= slugify(req.body.title)
       req.body.imgCover = req.files.imgCover[0].filename  
     req.body.images = req.files.images.map((img)=>img.filename)
       if(!req.body.images)return next(new AppError('images is not existed'))
        let result = await productModel.create(req.body)
        !result &&  next (new AppError(`Can't create this Product`,404))
        result && res.json({messaeg:'success',result})
    }
)

const getAllProducts = catchAsyncError(async(req,res)=>{
    let apiFeature = new ApiFeature(productModel.find(),req.query).paginate().fields().filter().sort().search()

    const result = await apiFeature.mongoseQuery
    res.json({messaeg:'success',page:apiFeature.page,result})
})

const getProduct = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const result = await productModel.findById(id)
    !result && next((new AppError(`Product not found`,404)))
    result && res.json({messaeg:'success',result})
} )  
const updateProduct = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
   if (req.body.title) {
    req.body.slug= slugify(req.body.title)
   }
    const result = await productModel.findByIdAndUpdate({_id:id},req.body,{new:true})
   !result && next (new AppError(`Product not found`,404))
    result && res.json({messaeg:'success',result})
} )  

const deleteProduct = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const result = await productModel.findByIdAndDelete(id)
    !result && next (new AppError(`Product not found`,404))
    result && res.json({messaeg:'success',result})
} )  

export {getAllProducts,getProduct,updateProduct,deleteProduct,createProduct}