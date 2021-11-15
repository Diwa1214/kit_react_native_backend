import { Result } from "../module/ResultSchema.js"
import expressAsyncHandler from 'express-async-handler'


export const resultPostController =async(req,res,next)=>{
  const {name,regno,profile,clgName,year,subjectmark} = req.body
  //console.log(req.body.subjectmark,"mark");
  try{
   const result = await Result.create({name:name,RegNo:regno,profile:profile,ClgName:clgName,subject:subjectmark,year:year})
   console.log("result",result)
   if(result){
     console.log("resultSendSuccessfully");
    return res.send(result)
   }
  }
 catch(error){
   console.log(error)
  }
}

export const resultGetController =async(req,res)=>{
  let name= req.query.name
  let regno = req.query.regno
  let clgName = req.query.clgName
   console.log(req.query.name,req.query.regno,req.query.clgName);
  
  try{
    const getResult =await Result.findOne({name:name,RegNo:regno,ClgName:clgName})
    console.log(getResult,"get");
    if(!getResult || getResult ==null){
     return  res.send({
         status:"404",
         msg:"Data not Found"
       })
      
    }
    return res.status(200).send({
      status:"200",
      data:getResult
    })
    
  }
  catch(error){
    console.log(error);
  }
}



export const GetStudentResultController = expressAsyncHandler(async(req,res)=>{
  try{
    const student = await Result.find({})
    //console.log(student);
    if(student){
       return res.send({
         status:"200",
         data:student
       })
    }
  }
  catch(error){
    console.log(error,"error");
     res.status(500).send({
       status:"500",
       msg:error
     })
  }
 })
 export const GetStudentDetailsController = expressAsyncHandler(async(req,res)=>{
   const id = req.query.id;
   console.log(id);
  try{
    const student = await Result.find({_id:id})
    console.log(student);
    if(student){
       return res.send({
         status:"200",
         data:student
       })
    }
  }
  catch(error){
    console.log(error,"error");
     res.status(500).send({
       status:"500",
       msg:error
     })
  }
 })

 export const resultUpdateController = async(req,res,next)=>{
  const {name,regno,profile,clgName,year,subjectmark} = req.body
   const id = req.query.id
   console.log(name,"ki")
  try{
   const updateId = await Result.findById({_id:id})
   //console.log("id",id,updateId);
   if(!updateId){
       console.log("Not found");
   }
  console.log("update",updateId);
   if(updateId){
      const updateResult = await Result.updateOne({_id:id},{$set:{
        name:name ==""?updateId.name :name,
        RegNo:regno==""?updateId.RegNo:regno ,
        ClgName:clgName==""?updateId.ClgName:clgName,
        year:year == "" ?updateId.year:year,
        subject:subjectmark.length ===0 ?updateId.subject : subjectmark 
      }})
       res.send({
         status:"200",
         data:updateResult
       })
   }
   else{
     res.send({
       status:"404",
       msg:"Update Failed"
     })
   }
  
  }
  catch(error){
    console.log(error,"update error");
  }
 }




export const DeleteStudentResultController = async(req,res)=>{
  const id = req.query.data
  console.log(req.query.data);
  try{
    const deleteItem = await Result.findByIdAndDelete({_id:id})
    if(!deleteItem){
      return res.send({
        status:"404",
        msg:"Something went wrong"
      })
      
    }
    res.send({
      status:"200",
      data:deleteItem
    })
  }
  catch(error){
     res.send({
       status:"500",
       msg:error
     })
  }
 }
 


 export const studentSearchController = async(req,res,next)=>{
    let data =  req.query.id 
    console.log("data",data);
    let filter = {}
    if(data){
       filter ={
         name :{
           $regex:data
         }
       }
    }
    else{
       filter ={}
    }
    console.log(filter);
    try{
      const search_Data = await Result.find(filter)
     if(search_Data){
      return res.send({
        status:"200",
        data:search_Data
      })
     }else{
      console.log("No Data");
     }
    }
    catch(error){
        console.log(error);
    }
 }