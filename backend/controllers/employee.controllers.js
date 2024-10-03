//write get all employees
import {employee as Employee} from '../models/employee.model.js'
import mongoose from 'mongoose'

const getAllEmployees=async(req,res)=>{
    //get all employees from databases
    const employees=await Employee.find()
    res.json(employees)
}

const createEmployee=async(req,res)=>{
    //console.log(req.body);
    //create new employee
    const employee=new Employee({
        name:req.body.name,
        email:req.body.email,
        mobileNo:req.body.phone,
        designation:req.body.position,
        gender:req.body.gender,
        courses:req.body.courses,
        imgUpload:req.body.path
    })
    //save employee to database
    try{
        const createdEmployee=await employee.save()
        res.json(createdEmployee)
    }catch(error){
        //console.log(error.errmsg);
        res.status(400).json(error.errmsg)
    }
    // const createdEmployee=await employee.save()
    // res.json(createdEmployee)
}

const updateEmployee=async(req,res)=>{
    //get employee by id
    const employee=await Employee.findById(req.params.id)
    // console.log(req.body.path);
    // console.log(req.body);
    if(employee){
        employee.name=req.body.name||employee.name
        employee.email=req.body.email||employee.email
        employee.mobileNo=req.body.phone||employee.mobileNo
        employee.gender=req.body.gender||employee.gender
        employee.courses=req.body.courses||employee.courses
        employee.imgUpload=req.body.path||employee.imgUpload
        const updatedEmployee=await employee.save()
        res.json(updatedEmployee)
    }else{
        res.status(404).json({message:'Employee not found'})
    }
}

const deleteEmployee=async(req,res)=>{
    //get employee by id
    //console.log(req.params);
    const { id } = req.params; // Ensure you're getting the id from request params or body

    // Validate if the id exists and is a valid ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid id' });
    }
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if(deletedEmployee){
        //delete employee by id
        res.json({message:'Employee removed'})
    }else{
        res.status(404).json({message:'Employee not found'})
    }
}

export {getAllEmployees,createEmployee,updateEmployee,deleteEmployee}