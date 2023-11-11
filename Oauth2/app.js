require('dotenv').config()

const createError=require('http-errors')
const express=require('express')
const path=require('path')
const cookieParser=require('cookie-parser')
const session=require('express-session')
const csrf=require('csurf')
const passport=require('passport')
const logger=require('morgan')
const mongoStore=require('connect-mongo')
const connectDB=require('./db').connectDB
app.use(connectDB())

const app=express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store:mongoStore.create({
                mongoUrl: process.env.DB_STRING,
                collection: 'sessions'
              })  
  }));

  app.use(csrf());
  app.use(passport.authenticate('session'));
  app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
  });

  app.use(function(req, res, next) {
    next(createError(404));
  });
  module.exports = app;