import mongoose from "mongoose";

const dbConnection = mongoose.connect('mongodb://127.0.0.1:27017/E-Commerce').then(()=>{
    console.log('connection is done');
})

process.on('unhandleRejection',(err)=>{
    console.log('unhandleRejection',err);
})

export default dbConnection