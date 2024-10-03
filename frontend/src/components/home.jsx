import React from 'react'
import Header from './header'
const home = () => {
    const userString = localStorage.getItem('user'); // Retrieve the string
    let user=null;
if (userString) { // Check if userString is not null
    user = JSON.parse(userString); // Parse it into an object
} 
  return (
    <>
    {userString&&(
    <div>
        <Header/>
    <div className='flex justify-center align-middle'>
        <h1 className='text-4xl my-20'>Welcome to Employee Management System Admin Portal</h1>
    </div>
    </div>
     )||(
        <div>not authorized</div>
    )}
    </>
  )
}

export default home