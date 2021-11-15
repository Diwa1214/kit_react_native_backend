import { Collection, Int32 } from "mongodb";
import mongoose from "mongoose"
import mongooseLong from 'mongoose-long';
mongooseLong(mongoose)

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String
        },
        phone:{
           type:Number
        },
       
    },{
        timestamps:true
    }
    )

    export const Users = mongoose.model("user",UserSchema)

