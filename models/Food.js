import mongoose from "mongoose";
import Joi from "joi";

const Food=mongoose.model("Food",new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
}));

function validateFood(food){
    const schema=Joi.object({
        name:Joi.string().required(),
        image:Joi.string().required(),
        price:Joi.number().required(),
        description:Joi.string().required().max(255),
    });
    return schema.validate(food);
}

export {Food,validateFood};
