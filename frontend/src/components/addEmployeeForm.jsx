import React from 'react'
import { useState } from 'react'
import Header from './header'
import { useNavigate } from 'react-router-dom';
//axios
import axios from 'axios'
export const AddEmployeeForm = () => {
    const userString = localStorage.getItem('user'); // Retrieve the string
    let user=null;
if (userString) { // Check if userString is not null
    user = JSON.parse(userString); // Parse it into an object
} 
    const navigate=useNavigate()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [position,setPosition]=useState('HR')
    const [gender,setGender]=useState('')
    const [courses,setCourses]=useState('MCA')
    const [image,setImage]=useState()
   const createEmployee= async(e)=>{
        e.preventDefault()
        //check if any thing is empty alert user
        if(!name||!email||!phone||!position||!gender||!courses||!image){
            alert('Please fill all the fields')
            return
        }
       //console.log(image);
        //console.log({name,email,phone,position,gender,courses,image});
        const formData=new FormData()
        formData.append("image", image);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("position", position);
        formData.append("gender", gender);
        formData.append("courses", courses);
        //send data to backend
        axios.post('http://localhost:4000/api/employees/create',formData,
        {
            headers:{
                'Content-Type':'multipart/form-data',
                authorization:localStorage.getItem('token')
            }
        }
        ).then((response)=>{
            console.log(response.data);
            navigate('/display')
        }).catch((error)=>{
            alert(error.data)
        })

    }
  return (
    <>
    {userString&&(
    <div>
    <Header/>
    <form onSubmit={createEmployee} className='flex flex-col items-start mx-20 my-10 p-5 gap-3' >
    <h1 className='text-3xl'> Add Employee</h1>
        <label className='w-auto'>Name</label>
        <input type="text" value={name} placeholder="Enter Name" onChange={(e)=> setName(e.target.value)}/>
        <label >Email</label>
        <input type="email" value={email} placeholder="Enter Email" onChange={(e)=> setEmail(e.target.value)}/>
        <label >Phone</label>
        <input type="text" value={phone} placeholder="Enter Phone" onChange={(e)=> setPhone(e.target.value)}/>
        {/* designation */}
        <label htmlFor="position">Position</label>
        <select name="position" id="position" value={position} onChange={(e)=> setPosition(e.target.value)}>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
        </select>
        {/* gender */}
        <label >Gender</label>
        {/* //store checkbox value in state */}
        <div className='flex flex-row gap-2'>
        <input type="radio"  name="gender" className='mt-1'
         value="M"
         onChange={(e)=> setGender(e.target.value)}
         />
        <label >Male</label>
        </div>
        <div  className='flex flex-row gap-2'>
        <input type="radio"  name="gender" className='mt-1'
         value="F"
         onChange={(e)=> setGender(e.target.value)}
         />
        <label >Female</label>
        </div>
            {/* //option male and female */}
            <label htmlFor="course">Course</label>

        <select name="course" id="course" value={courses} onChange={(e)=> setCourses(e.target.value)}>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
        </select>
        <label >Image</label>
        <input type="file" name="image" onChange={(e)=> {setImage(e.target.files[0])}}/>
        <div className='grid  place-items-center'>
        <button type="submit" className='bg-slate-400 rounded w-auto p-1 m-y-4'>Submit</button>
        </div>
    </form>
    </div>
    )||(
        <div>not authorized</div>
    )}
    </>
  )
}