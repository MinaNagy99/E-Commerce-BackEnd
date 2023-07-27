import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        minLenght:[2,'name is too short']
        
    },
    slug:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    categoryID:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    }

},{timestamps:true})

const subcategoryModel = mongoose.model('subCategory',schema)

export default subcategoryModel