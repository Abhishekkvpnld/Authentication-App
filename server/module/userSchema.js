import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide unique username'],
        unique:[true,'username Exist']
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        unique:false
    },
    email:{
        type:String,
        required:[true,'Please provide a unique email'],
        unique:true
    },
    firstName:{type:String},
    lastName:{type:String},
    mobile:{type:Number},
    adress:{type:String},
    profile:{type:String}
})

export default mongoose.model.users || mongoose.model("user",userSchema);