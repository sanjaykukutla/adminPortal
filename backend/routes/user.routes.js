import {getAllEmployees,createEmployee,updateEmployee,deleteEmployee} from "../controllers/employee.controllers.js";
//multer
import {upload} from '../utils/multer.middleware.js'
import { processEmployeeData,processUpdateEmployeeData} from "../utils/processEmployeeData.middleware.js";
import { verifyToken } from "../utils/verifyToken.middleware.js";
//import router 
import express from 'express';
const router=express.Router()
//write get all employees
router.get('/employees',getAllEmployees)
router.post('/employees/create',upload.fields([{name:'image'}]),processEmployeeData,verifyToken,createEmployee)
router.put('/employees/:id/update',verifyToken,upload.fields([{name:'image'}]),processUpdateEmployeeData,updateEmployee)
router.post('/employees/:id/delete',verifyToken,deleteEmployee)

export default router