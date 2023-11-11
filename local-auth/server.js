const express=require('express')
const passport=require('passport')
const MongoStore=require('connect-mongo')
const session=require('express-session')
const routes=require('./routes/index')
require('dotenv').config();

const connectDB=require('./config/db')
connectDB()




const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}));




app.use(
  session({
      secret: 'keyboard cat',
      resave: false,//don't save session is unmodified
      saveUninitialized: true,//don't create session untill something is stores
      store: MongoStore.create({
        mongoUrl: process.env.DB_STRING,
        collection: 'sessions'
      })  
  })
  )

require('./config/passport')(passport)

passport.use(passport.initialize())
passport.use(passport.session())

app.use((req,res,next)=>{
    console.log("session info:",req.session)
    console.log("user info:",req.user)
    next()
})

app.use('/',routes)



// app.use(passport.initialize());
// app.use(passport.session());

app.listen(8000,()=>{
    console.log('serverr is running you better catch it')
})