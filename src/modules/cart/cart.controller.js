import { catchAsyncError } from "../../../middleware/catchAsyncError.js"
import { AppError } from "../../../utilits/AppError.js"
import userModel from "../../../dataBase/models/user.model.js"
import cartModel from "../../../dataBase/models/cart.model.js"




 
export const addCart = catchAsyncError(async(req,res,next)=>{
        const {productId} = req.params 
        
        const cart = await cartModel.findOne({userId:req.user._id})
        if (cart) {
            const result = await cartModel.findOneAndUpdate({userId:req.user._id}).populate('products').populate('userId','name')
            const product = result.products.f
            console.log(product);
            res.json({message:'succes',result})

        }if(!cart){
            const newCart = await cartModel.insertMany({userId:req.user._id,$push:{products:productId}})
            const result = await cartModel.findOneAndUpdate({userId:req.user._id},{$push:{products:productId}},{new:true})

            res.json({message:'success',newCart})
        }
    

} )  

export const addProductToCart = catchAsyncError(async(req,res,next)=>{
    const{productId} = req.body 
    const addProduct =await cartModel.findOneAndUpdate({userId:req.user._id},{$push:{products:productId}})
    res.json({message:'success',addProduct})
})
export const getAllAddresses = catchAsyncError(async(req,res,next)=>{
    const result = await userModel.find()
    !result && next (new AppError(`can't add to address`,404))
     result && res.json({messaeg:'success',result:result.addresses})
} )

export const getAddress = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    let text = id.toString();

    const result = await userModel.findById(req.user._id)
    !result && next (new AppError(`can't get address`,404))
    const test =result.addresses.map((elm)=>elm._id)
    console.log(test.map((elm)=>elm==new ObjectId(text)))
    result && res.json({messaeg:'success',result:result})
})
 


