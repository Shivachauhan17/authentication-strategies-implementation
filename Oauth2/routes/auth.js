const router=require('express').Router()
const passport =require('passport')

const isLoggedIn=(req,res,next)=>{
    req.user?next():res.sendStatus(401)
}


router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
 
router.get('/auth/google/callback', 
  passport.authenticate('google', {failureRedirect: 'http://localhost:5173/failure',successRedirect:'http://localhost:5173/successfull' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/',(req,res,next)=>{
    res.send('<h1> at home </h1><a href="http://localhost:8000/auth/google">login with google</a>')
})



router.get('/protected',isLoggedIn,(req,res,next)=>{
    res.send("on protected")
})

module.exports=router