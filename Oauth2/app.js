require('dotenv').config()

const express=require('express')
const cors=require('cors')
const passport=require('passport')
const logger=require('morgan')
const connectDB=require('./db')
const router=require('./routes/auth')
connectDB()

const app=express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use(router);

app.listen(8000,()=>{
  console.log('server is running you better catch it')
})