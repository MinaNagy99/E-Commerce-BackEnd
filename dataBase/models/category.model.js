import mongoose, { Types } from "mongoose";

const categorySchema = mongoose.Schema({
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
    },img:{
        type:String
    }

},{timestamps:true})

categorySchema.post('init',(doc)=>{
    doc.img = 'http://localhost:3000/category/'+doc.img
})

const categoryModel = mongoose.model('category',categorySchema)

export default categoryModel