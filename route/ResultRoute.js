import express from "express"
import { DeleteStudentResultController, GetStudentDetailsController, GetStudentResultController, resultGetController, resultPostController, resultUpdateController, studentSearchController } from "../controller/ResultController.js"
import { Result } from "../module/ResultSchema.js"

const ResultRoute = express.Router()

ResultRoute.post("/postResult",resultPostController)
ResultRoute.get("/getResult",resultGetController)
ResultRoute.get("/getStudent",GetStudentResultController)
ResultRoute.get("/getStudentDetails",GetStudentDetailsController)
ResultRoute.delete("/DeleteStudent",DeleteStudentResultController)
ResultRoute.put("/updateStudent",resultUpdateController)
ResultRoute.get("/StudentSearch",studentSearchController)
export default ResultRoute