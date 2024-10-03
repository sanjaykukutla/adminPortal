import React, { useEffect, useState} from 'react'
import axios from 'axios'
import Header from './header'
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'
const DisplayComponents = () => {
    const userString = localStorage.getItem('user'); // Retrieve the string
    let user=null;
if (userString) { // Check if userString is not null
    user = JSON.parse(userString); // Parse it into an object
} 
  const [employee, setemployees] = useState([]);
   const [searchTerm1, setSearchTerm] = useState('');
  const [FilteredEmployees,setFilteredEmployees] =useState([]);
  const navigate= useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/api/employees",{
        headers:{
            authorization:localStorage.getItem('token')
      }});
      const data = await response.json();
      //convert the json to array
      //console.log(data);
      const arr = [...data];
      setemployees(arr);
      setFilteredEmployees(arr)
    //   console.log(arr);
       // console.log(FilteredEmployees);
      //console.log(arr);
      // arr.map((e)=>{console.log(e.name);})
    };
    fetchData();
  }, []);

  const handleEdit = (employee) => {
   // console.log(employee);
    //navigate to updateEmployee
    // navigate(`/update/${employee._id}`);
    navigate(`/update/${employee._id}`, { state: { employee } });
    //console.log(employee);
  };

  const handleDelete = (employee1) => {
    //console.log(employee1);
    //const token=localStorage.getItem('token');
    //console.log(token);
    axios
      .post(
        `http://localhost:4000/api/employees/${employee1._id}/delete`,
        employee1,
        {
            headers:{
                authorization:localStorage.getItem('token')
          }}
      )
      .then((response) => {
        //console.log(response.data);
        //remove that employee from the state
        //filter the employee array
        // if (employee&&Array.isArray(employee)) {
            const updatedEmployees = employee.filter((e) => e._id !== employee1._id);

            // Update both `employees` and `filteredEmployees` states with the filtered array
            setemployees(updatedEmployees);
            setFilteredEmployees(updatedEmployees);
            
    //    }
        //employee.filter((e) => e._id !== employee._id)
        // setemployees(employee);
        // setFilteredEmployees(employee)
      })
      .catch((error) => {
        alert(error);
      });
    console.log("Delete button clicked");
  };

  const handleSearch=(e)=>{
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const employee1 = [...employee];
    // Filter employees based on the search term
    const res = employee1.filter((employee) => {
      if (searchTerm === '') {
        // If searchTerm is null or empty, return true to include all employees
        return true;
      } else {
        // Filter employees based on the search term
        return (
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.mobileNo.includes(searchTerm) ||
            employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.gender.toLowerCase().includes(searchTerm.toLowerCase())||
            employee.courses.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
    });
  
    // Set the filtered employees based on the search results
      setFilteredEmployees(res); // Set the filtered employees if matches are found
    console.log(res);
  }

  return (
    // <div className='flex flex-col'>
    // {
    //     employee?.map((e,index)=>(
    //         <div className='grid grid-cols-8 '>
    //         <div className='p-4'>{index+1}</div>
    //         <div className='p-4'>{e.name}</div>
    //         <div className='p-4'>{e.email}</div>
    //         <div className='p-4'>{e.mobileNo}</div>
    //         <div className='p-4'>{e.designation}</div>
    //         <div className='p-4'>{e.gender}</div>
    //         <div className='p-4'>{e.courses}</div>
    //         {/* <img src={`${e.imgUpload}`}  alt="sanjayImage"/> */}
    //         </div>
    //     ))
    // }
    // </div>
    <>
    {userString&&(
    <div>

        <Header/>
      <div className="grid grid-cols-3">
        <div className='text-xl p-4'>Employees List</div>
        <div className='col-span-1'>
        </div>
        <input
          type="text"
          placeholder="Search With Name,Email,Number,Position or Gender"
          className=" w-90  m-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          value={searchTerm1}
          onChange={handleSearch}
        />
        {/* <button className="ml-2 p-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Search
        </button> */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-200 p-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-2 border">Id</th>
              <th className="px-6 py-2 border">Image</th>
              <th className="px-6 py-2 border">Name</th>
              <th className="px-6 py-2 border">Email</th>
              <th className="px-6 py-2 border">Mobile No</th>
              <th className="px-6 py-2 border">Designation</th>
              <th className="px-6 py-2 border">Gender</th>
              <th className="px-6 py-2 border">Course</th>
              <th className="px-6 py-2 border">CreateDate</th>
              <th className="px-6 py-2 border">Action</th>
            </tr>
          </thead>
            <tbody>
                {FilteredEmployees?.length>0&&FilteredEmployees.map((employee, index) => (
                  <tr key={employee._id} className="hover:bg-gray-50">
                    <td className="px-6 py-2 border">{index + 1}</td>
                    <td className="px-6 py-2 border">
                      {/* /Users/sanjaykukutla/Downloads/intern_assigment_blr/backend/uploads/image-1727796691522.jpg */}
                      <img
                        // src={employee.imgUpload}
                       src={'http://localhost:4000/uploads/'+employee.imgUpload.substring(employee.imgUpload.lastIndexOf('/') + 1)}
                        // src={'http://localhost:4000/uploads/'+photo}
                        className="rounded-full w-12 h-12"
                      />
                    </td>
                    <td className="px-6 py-2 border">{employee.name}</td>
                    <td className="px-6 py-2 border">{employee.email}</td>
                    <td className="px-6 py-2 border">{employee.mobileNo}</td>
                    <td className="px-6 py-2 border">{employee.designation}</td>
                    <td className="px-6 py-2 border">{employee.gender}</td>
                    <td className="px-6 py-2 border">{employee.courses}</td>
                    <td className="px-6 py-2 border">{dayjs(employee.createdAt).format('MMMM D, YYYY h:mm A')}</td>
                    <td className="px-6 py-2 grid-rows-2 border">
                      <button
                        className="bg-blue-500 text-white px-6 py-2 m-2 rounded"
                        onClick={() => handleEdit(employee)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 m-2 rounded"
                        onClick={() => handleDelete(employee)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
    )||(
        <div>not authorized</div>
    )}
    </>
  );
}

export default DisplayComponents