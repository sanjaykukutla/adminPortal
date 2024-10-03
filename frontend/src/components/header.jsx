import React from 'react'
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate=useNavigate();
    const userString = localStorage.getItem('user'); // Retrieve the string
    let user=null;
if (userString) { // Check if userString is not null
    user = JSON.parse(userString); // Parse it into an object
} 
const handlelogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
}
  return (
    <>
    {userString&&(
    <div>
        {/* crreate links for add employee and display employee */}

        <div className='grid grid-cols-8 bg-gray-300 p-5'>
            <a href="/home" className='text-xl p-4 pl-10 text-center align-middle'>Home</a>
            <a href="/display" className='text-xl py-4'>Employee List</a>
            <a href="/add" className='text-xl py-4'>Add Employee</a>
            {/* <h1>{user.name}</h1> */}
            {userString&&(
                <>
                <div className='col col-span-3'></div>
                <h1 className='p-4 pl-10 font-semibold text-2xl'>{user.name}</h1>
                <button className='bg-red-500 text-white m-3 mx-6 rounded-lg hover:bg-red-600' onClick={handlelogout}>Logout</button>
                </>
            )}
            </div>
    </div>
    )}
    </>
  )
}

export default Header