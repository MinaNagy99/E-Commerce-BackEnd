import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    code:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    discound:{
        type:Number,
        min:0,
        required:true
    },
    expire:{
        type:Date
    }

})

const couponModel = mongoose.model('coupon',schema)

export default couponModel