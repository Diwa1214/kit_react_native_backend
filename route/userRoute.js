import express from "express"
import { userGetController, UserLoginController, userPostController } from "../controller/userController.js"
const userRoute = express.Router()

userRoute.post("/CreateUser",userPostController)
userRoute.get("/getUsers",userGetController)
userRoute.post("/login",UserLoginController)
export default userRoute