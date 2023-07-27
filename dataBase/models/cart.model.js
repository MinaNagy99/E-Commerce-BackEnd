import mongoose from "mongoose";


const cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    products:[{type:mongoose.SchemaTypes.ObjectId,
        ref:'product'}],
    totlaPrice:Number,
    totlaPriceAfterDiscount:Number,
    discount:{
        type:mongoose.Types.ObjectId,
        ref:'coupon'
    }
})

const cartModel = mongoose.model('cart',cartSchema)

export default cartModel