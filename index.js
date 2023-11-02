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

app.post("/", (req, res) => {
  console.log(req.body);
  const mail = {
    from: "officialyashvora1978@gmail.com",
    to: req.body.to,
    subject: req.body.subject,
    html: `<h1>Dear Customer use this OTP to Sign In/Up: ${ generateOTP()}</h1>`,
  };

  transport.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  res.send("NodeMail is now sent!");
});

app.listen(8090, () => {
  connect()
  console.log("listening on 8090");
});
