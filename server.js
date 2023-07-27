
import  Express  from "express";
import dbConnection from "./dataBase/dbConnection.js";
import  Morgan  from "morgan";
import * as dotenv from 'dotenv'
import morgan from "morgan";
import { init } from "./src/modules/index.routes.js";

dotenv.config()


 const app = Express()
dbConnection
app.use(Express.json())
 app.use(Express.static('uploads'))
app.use(morgan('dev'))
init(app)

app.use((err,req,res,next)=>{
   const statusCode = err.statusCode || 500 
   res.status(statusCode).json({err:err.message,statusCode})
})
 app.listen(3000,()=>{
    console.log('server is running');
 })