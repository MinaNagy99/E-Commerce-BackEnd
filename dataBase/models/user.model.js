import mongoose, { Types } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLenght:[2,'name is too short']
    },
   email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minLenght:[2,'email is too short']
    
   },
   password:{
    type:String,
    required:true,
    minLenght:[6,'password is too short']
   },
   profilePic:String,
   role:{
    type:String,
    enum:['user','admin'],
    default:'user'
   },
   changePasswordAt:Date,
   isActive:{
    type:Boolean,
    default:true
   },
   verified:{
    type:Boolean,
    default:false
   },
   wishList:[{type:mongoose.SchemaTypes.ObjectId,ref:'product'}],
   addresses:[{
    city:String,
    street:String,
    phone:String
   }]

},{timestamps:true})

userSchema.pre('save',function () {
    console.log(this);
    this.password=bcrypt.hashSync(this.password,7)
    
})
const userModel = mongoose.model('user',userSchema)

export default userModel