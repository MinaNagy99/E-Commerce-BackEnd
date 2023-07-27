import mongoose, { Types } from "mongoose";

const reviewSchema = mongoose.Schema({
    comment:{
        type:String,
        trim:true,
        minLenght:[2,'text is too short']
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:'product'
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    rating:{
        type:Number,
        min:1,
        max:5           
    }

})

reviewSchema.pre(['find','findOne'] ,function(){
    this.populate('userId','name -_id')
})

const reviewModel = mongoose.model('review',reviewSchema)

export default reviewModel