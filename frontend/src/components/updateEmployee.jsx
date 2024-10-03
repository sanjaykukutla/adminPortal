import React from 'react'
import { useState,useRef } from 'react'
import Header from './header'
import { useParams ,useNavigate,useLocation} from 'react-router-dom';
//axios
import axios from 'axios'
export const UpdateEmployee = () => {
    const navigate=useNavigate()
    const {employee}=useLocation().state||{}
    //console.log(employee);
    const { id } = useParams();
    const [name,setName]=useState(employee.name)
    const [email,setEmail]=useState(employee.email)
    const [phone,setPhone]=useState(employee.mobileNo)
    const [position,setPosition]=useState(employee.designation)
    const [gender,setGender]=useState(employee.gender)
    const [courses,setCourses]=useState(employee.courses)
    const [image,setImage]=useState(employee.imgUpload)
    const fileInputRef = useRef(null);
    // console.log(image.name);
   const createEmployee= async(e)=>{
        e.preventDefault()
        //check if any thing is empty alert user
        // if(!name||!email||!phone||!position||!gender||!courses||!image){
        //     alert('Please fill all the fields')
        //     return
        // }
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
        axios.put( `http://localhost:4000/api/employees/${id}/update`,formData,
        {
            headers:{
                'Content-Type':'multipart/form-data',
                authorization:localStorage.getItem('token')
            }
        }
        ).then((response)=>{
            //console.log(response.data);
            navigate('/display')
        }).catch((error)=>{
            alert(error.data)
        })
    }

    const handleButtonClick = (e) => {
        e.preventDefault(); // Prevent form submission
        fileInputRef.current.click(); // Trigger file input click
      };
    
  return (
    <div>
    <Header/>
    <form onSubmit={createEmployee} className='flex flex-col items-start mx-20 my-10 p-5 gap-3' >
        <h1 className='text-3xl'>Employee Edit</h1>
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
         checked={gender === 'M'}
         onChange={(e)=> setGender(e.target.value)}
         />
        <label >Male</label>
        </div>
        <div  className='flex flex-row gap-2'>
        <input type="radio"  name="gender" className='mt-1'
         value="F"
         checked={gender === 'F'}
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
        <div>
        <input type="file" name="image" onChange={(e)=> {setImage(e.target.files[0])}} className='hidden' ref={fileInputRef} />
        <button
        onClick={ handleButtonClick} // Trigger file input click
        className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none'
      >
        Select Image
      </button>
        </div>
        <div>{
            image?.name&&<p>Updated Image : {image?.name}</p>
            ||image&&<p>Existing Image : {image}</p>
            } </div>
        <div className='grid  place-items-center'> 
        <button type="submit" className='bg-slate-400 rounded w-auto p-1 m-y-4'>Update</button>
        </div>
    </form>
    </div>

  )
}