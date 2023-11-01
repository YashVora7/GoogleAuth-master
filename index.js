const express = require("express");
const app = express();
app.use(express.json());
const nodemailer = require("nodemailer");

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

app.get("/:otp", (req, res) => {
  const { otp } = req.params;
  const generatedOTP = generateOTP();

  if (otp === generatedOTP) {
    res.send("OTP Verification Done!");
  } else {
    res.send("Error Verification");
  }
});

app.listen(8090, () => {
  console.log("listening on 8090");
});
