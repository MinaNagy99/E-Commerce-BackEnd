import mongoose, { Types } from "mongoose";
const opts = { toJSON: { virtuals: true } };

const productSchema = mongoose.Schema({
    title:{
        type:String,
        unique:[true,'title is unique'],
        required:[true, 'title is required'],
        trim:true,
        minLenght:[2,'name is too short']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true,
        unique:true    },
    price:{
        type:Number,
        required:[true,'price is required'],
        min:0

    }  ,
    priceAfterDiscount:{
        type:Number,
        min:0

    }  ,   
     rateAve:{
        type:Number,
        min:0,
        max:5
    }  ,
    ratingCount:{
        type:Number,
        default:0,
        min:0
    },
    description:{
        type:String,
        minLenght:5,
        maxLenght:300,
        trim:true,
        required:[true,'description is required']
    },
    quantity:{
        type:Number,
        default:0,
        required:[true,'quantity is required']
    },
    sold:{
        type:Number,
        min:0,
        default:0
    },
    imgCover:String,
    images:[String],
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    subaCategoryId:{
        type:mongoose.Types.ObjectId,
        ref:'subCategory'
    },
    brandId:{
        type:mongoose.Types.ObjectId,
        ref:'brand'
    }
    



},{timestamps:true,opts})
productSchema.virtual('reviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'productId',
  });


productSchema.post('init',(doc)=>{
        doc.images = doc.images.map((img)=>'http://localhost:3000/product/'+img)
        doc.imgCover = 'http://localhost:3000/product/'+doc.imgCover
})
productSchema.pre(['find','fineOne'],function(){
    this.populate('reviews','-productId comment rating')
} )

const productModel = mongoose.model('product',productSchema)

export default productModel