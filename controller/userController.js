import { Users } from "../module/UserSchema.js"
import bcrypt  from "bcryptjs"
import jwt from "jsonwebtoken"


export const userPostController = async (req,res,next)=>{
const {email,name,phone} = req.body
var salt = bcrypt.genSaltSync(10)
var hash = bcrypt.hashSync(req.body.password, salt);
 try{
  const  AlreadyRegister = await Users.findOne({email:email})
  if(AlreadyRegister){
      res.send({
        status:"404",
        msg: "This email-Id is Already register"
      })
  } else{
  const user = await Users.create({email:email,password:hash,name:name,phone:phone})
  console.log(user,"u");
  if(user){
    res.send({
      status:"200",
      data:user
    })
  }
 }
}
 
 catch(error){
   res.send({
     status:"500",
     msg:"Network failed"
   })
}

}
export const userGetController = async (req,res,next)=>{
  
  try{
    const user = await Users.find({})
    console.log("users",user)
    if(user){
      res.status(200).send(user)
    }
  }
  
  catch(error){
    console.log(error)
  }
  }
  //Login // 
  export const UserLoginController = async(req,res)=>{
      const {email,password} = req.body
   
      try{
        const isEmailVerifed = await Users.findOne({email:email})
        console.log(isEmailVerifed,"emailverify");
        if(isEmailVerifed){
          
            const passwordVerifed =  bcrypt.compareSync(password,isEmailVerifed.password,(error)=>{
            console.log(error);
            }) 
           
            if(passwordVerifed){
               const token = await jwt.sign({
                  _id:isEmailVerifed._id,
                  email : isEmailVerifed.email
               },"Secret",{expiresIn:"1h"})
              res.send({
                status:"200",
                data:token
              })
            }
            else{
              res.send({
                status:"404",
                msg:"Password mismatch"
              })
            }
         }
         else{
           console.log("No user");
            res.send({
              status:"404",
              msg:"User not found"
            })
         }
      }
      catch(error){
         console.log(error);
      }
   }
 