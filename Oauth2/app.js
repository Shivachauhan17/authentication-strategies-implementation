require('dotenv').config()

const express=require('express')
const cors=require('cors')
const passport=require('passport')
const logger=require('morgan')
const MongoStore=require('connect-mongo')
const session=require('express-session')
const connectDB=require('./config/db')
const router=require('./routes/auth')
connectDB()


const app=express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));

app.use(
  session({
      secret: 'keyboard cat',
      resave: false,//don't save session is unmodified
      saveUninitialized: true,//don't create session untill something is stores
      store: MongoStore.create({
        mongoUrl:process.env.DB_STRING,
        collection: 'sessions'
      }),
      cookie:{
        maxAge:1000*60*60*24
      }  
  })
  )

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{
  console.log("session info:",req.session)
  console.log("user info:",req.user)
  next()
})

app.use(router);

app.listen(8000,()=>{
  console.log('server is running you better catch it')
})