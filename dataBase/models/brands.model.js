import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        minLenght:[2,'name is too short']
    },
    logo:{
        type:String,
    },   
     slug:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    }

},{timestamps:true} )

schema.post('init',(doc)=>{
doc.logo = 'http://localhost:3000/brand/'+doc.logo
})
const brandModel = mongoose.model('brand',schema)

export default brandModel