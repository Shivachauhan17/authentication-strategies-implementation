const router=require('express').Router()
const passport=require('passport')
const genPassword=require('../lib/passwordUtil').genPassword
const User=require('../models/user')


router.post('/login',passport.authenticate('local',{failureRedirect:"/login-failure",successRedirect:"/login-success"}))



router.post('/register',async (req,res,next)=>{
    const saltHash=genPassword(req.body.password)

    const salt=saltHash.salt
    const hash=saltHash.hash

    await User.findOneAndUpdate({userName:req.body.userName},{
        userName:req.body.userName,
        hash:hash,
        salt:salt
    },{new:true,upsert:true})
    .then((user)=>{
        console.log("on register route",user)
    })

    

    res.redirect('/login')
})


router.get('/',(req,res,next)=>{
    res.send('<h1>HOme</h1> <p>please</p> <a href="/register">register</a>')
})

router.get('/login',(req,res,next)=>{
    const form=`<h2>User Login</h2>
    <form action="/login" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="userName" required><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <input type="submit" value="Register">
    </form>`
    res.send(form)
})

router.get('/register',(req,res,next)=>{
    res.send(`<h2>User Registration</h2>
    <form action="/register" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="userName" required><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <input type="submit" value="Register">
    </form>`)
})



router.get('/login-failure',(req,res,next)=>{
    res.send('<h1>login failed</h1>')
})

router.get('/login-success',(req,res,next)=>{
    res.send('<h1>login successful</h1> <a href="/protected">protected route</a>')
})

router.get('/protected',(req,res,next)=>{
    if(req.isAuthenticated()){
        res.send('<h1> you are authenticated  </h1> <a  href="/logout">logout</a>')
    }
    else{
        res.send('<h1> you are not authenticated </h1>')
        return res.redirect('/login')
    }
})

router.get('/logout',(req,res,next)=>{
    req.logOut();
    res.redirect('/protected-route')
})

module.exports=router