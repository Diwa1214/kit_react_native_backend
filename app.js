import express from "express"
import {MongoClient  } from "mongodb"
import mongoose from "mongoose"
import ResultRoute from "./route/ResultRoute.js"
import userRoute from "./route/userRoute.js"

const app = express()
app.use(express.json())
const port = 9000

app.use("/api",userRoute)
app.use("/api",ResultRoute)

app.get("/",(req,res)=>{
   res.send("Hai")
})

app.use((err,req,res,next)=>{
  console.log(err);
   res.status(500).send({
     msg:err.messageg
   })
})

mongoose.connect("mongodb+srv://user:user@cluster0.43znc.mongodb.net/kit",{useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  app.listen(port,()=>{
    console.log(`Server is start${port} and Connected DB`)
})
})



