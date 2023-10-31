const express = require('express');

const app = express();

app.use(express.json())

// const session = require("express-session")

// const passport = require('passport')

// app.use(session({secret: 'secret'}))

// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: "141362346302-2hbgflb1a4dash4uqt8k2tgo52cpdd1s.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL: "http://localhost:8090/auth/google/callback"
//   },
//   (accessToken, refreshToken, profile, cb) => {
//     console.log(profile);
//     return cb(null, profile)
//   }
// ));

// passport.serializeUser((User , done) =>{
//     return done(null , User)
// })
// passport.deserializeUser((User , done) =>{
//     return done(null , User)
// })


// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile',"email"] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google'),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.send('done');
// });

const nodemailer = require('nodemailer')

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

const transport = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: 'officialyashvora1978@gmail.com',
      pass: 'rpprbwxvxnehmiix'
    }
  }
)

app.post("/",(req,res)=>{

  console.log(req.body);
  const mail = {
    from: 'officialyashvora1978@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    html: `<h1>Dear Customer use this otp to SignIn/Up:</h1>`+ otp
  }

  console.log(otp);

  transport.sendMail(mail,(err,info)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(info);
    }
  })

  res.send("NodeMail is now sent!");

})



app.get("/:otp",(req,res)=>{
  const {otp} = req.params

  if(otp == otp){
    res.send("OTP Verification Done!");
  }
  else{
    res.send("Error Verification");
  }
})


app.listen(8090,()=>{
    console.log("listening on 8090");
})