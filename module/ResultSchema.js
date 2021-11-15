import mongoose from "mongoose"
import mongooseLong from "mongoose-long" 
mongooseLong(mongoose)
const ResultSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        RegNo:{
            unique:true,
            type:mongoose.Schema.Types.Long,
            
        },
        ClgName:{
            type:String
        },
        profile:{
           type:String
        },
        year:{
            type:String
        },
        subject:[
            {
                subjectType:{
                    type:String
                } ,
                subjectName:{
                    type:String
                } ,
                marks:{
                    type:Number
                }
            }
        ]
    },{
        timestamps:true
    }
    )
    export const Result = mongoose.model("result",ResultSchema)