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

const transport = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: 'officialyashvora1978@gmail.com',
      pass: 'rppr bwxv xneh miix'
    }
  }
)

app.post("/",(req,res)=>{
  const mail = {
    from: 'officialyashvora1978@gmail.com',
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.text
  }

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


app.listen(8090,()=>{
    console.log("listening on 8090");
})