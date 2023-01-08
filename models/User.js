import Joi from "joi";
import mongoose from "mongoose";

const User=mongoose.model("User",new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    otpCode:{
        type:String,
    }, 
},{
    timestamps:true,
}));

function validateUser(user){
    const schema=Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string().required().min(6).max(255),
    });
    return schema.validate(user);
}

export {User,validateUser};


