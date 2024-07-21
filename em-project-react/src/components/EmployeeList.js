import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from "../services/EmployeeService";
import Employee from './Employee';

const EmployeeList = () => {
  
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await EmployeeService.getEmployees();
          setEmployees(response.data);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    }, []);

    const deleteEmployee = (e, id) => {
      e.preventDefault();
      EmployeeService.deleteEmployee(id).then(() => {
        if (employees) {
          setEmployees((prevElement) => {
            return prevElement.filter((employee) => employee.id !== id);
          });
        }
      });
    };



  return (
    <div className='container mx-auto my-8'>
        <div className='h-12'>
          <button 
          onClick={()=> navigate("/addEmployee")}
          className="rounded bg-slate-600 hover:bg-blue-700 font-semibold mx-40 px-20 py-2">
            Add Employee 👨🏼‍💻
          </button>
        </div>
      <div className='px-40'>
        <table className='shadow'>
          <thead className='bg-slate-600'>
            <th className='uppercase tracking-wider py-3 px-6'>
              Name
            </th>
            <th className='uppercase tracking-wider py-3 px-6'>
              Phone
            </th>
            <th className='uppercase tracking-wider py-3 px-6'>
              Email
            </th>
            <th className='uppercase tracking-wider py-3 px-6'>
              Actions
            </th>
            </thead>
            {!loading && (
            <tbody>
              {employees.map((employee) => (
                <Employee
                  employee={employee}
                  deleteEmployee={deleteEmployee}
                  key={employee.id}></Employee>
              ))}
            </tbody>
          )}

          {/* </tr>
          {employees.map((employee) => (
          <tr className='hover:bg-white hover:text-gray-950'>
            <td className='text-left px-6 py-4'> {employee.firstName}</td>
            <td className='text-left px-6 py-4'> {employee.lastName}</td>
            <td className='text-left px-6 py-4'> {employee.emailId} </td>
            <td className='text-left px-6 py-4'> 
              <a 
               onClick={(e) => editEmployee(e, employee.id)}
               className='text-left px-6 py-4 hover:text-green-400' href='#'>Edit 📝</a>
             
              <a  
              onClick={(e) => deleteEmployee(e, employee.id)}
              className='text-left px-6 py-4 hover:text-red-400' href='#'>Delete 🗑️</a>
            </td>
          </tr>
          ))} */}
          {/* <tr className='hover:bg-white hover:text-gray-950'>
            <td className='text-left px-6 py-4'> Shivam</td>
            <td className='text-left px-6 py-4'> 98XXXXX</td>
            <td className='text-left px-6 py-4'> Shivam@gmail.com </td>
            <td className='text-left px-6 py-4'> 
              <a className='text-left px-6 py-4 hover:text-green-400' href='#'>Edit 📝</a>
              <a  className='text-left px-6 py-4 hover:text-red-400' href='#'>Delete 🗑️</a>
            </td>
          </tr> */}

        </table>
      </div>
      </div>
  )
}

export default EmployeeList