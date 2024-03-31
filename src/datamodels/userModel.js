
import mongoose from "mongoose";


const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Enter user name"],
        unique:[true,"username already exist"]
    },
    email:{
        type:String,
        required:[true,"Enter email name"],
        unique:[true,"email already exist"]
    },

    password:{
        type:String,
        required:[true,"Enter password"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date

});


const User = mongoose.models.nextusers || mongoose.model("nextusers",userschema);

export default User;
