const express = require("express");
const app = express();
app.use(express.json());
const nodemailer = require("nodemailer");
const connect = require("./db");
const user = require("./user.model");

// Function to generate OTP
const generateOTP = () => {
  let otp = Math.floor(Math.random() * 1000000);
  console.log(otp);
  return otp.toString();
};

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "officialyashvora1978@gmail.com",
    pass: "rpprbwxvxnehmiix",
  },
});

app.post("/create",async(req,res)=>{
  let data = await user.create(req.body)
  res.send(data)
})

app.get("/",async(req,res)=>{
  let data = await user.find()
  res.send(data)
})

app.post("/otp", async(req, res) => {
  console.log(req.body);
  const mail = {
    from: "officialyashvora1978@gmail.com",
    to: req.body.to,
    subject: "password reset",
    html: `<h1>Dear Customer use this OTP to Sign In/Up: ${ generateOTP()}</h1>`,
  };

  await transport.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  res.send("NodeMail is now sent!");
});

app.post("/verify",async(req,res)=>{
  let {otp, password, email} = req.body

  if(otp == otp){
    let userdata = await user.findOne({email: email})

    if(userdata){
      userdata.password = password
      await userdata.save()
      res.send("done")
    }
    else{
      res.send("user not found")
    }

  }
  else{
    res.send("Invalid")
  }

})

app.listen(8090, () => {
  connect()
  console.log("listening on 8090");
});
