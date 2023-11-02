const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name:String,
        email:String,
        password:String,
    }
);

let user = mongoose.model("userdata",userSchema)

module.exports=user