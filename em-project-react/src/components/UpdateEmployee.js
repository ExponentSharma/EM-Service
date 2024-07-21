import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    id: id,
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getEmployeeById(employee.id);
        setEmployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const updateEmployee = (e) => {
    e.preventDefault();
    console.log(employee);
    EmployeeService.updateEmployee(employee, id)
      .then((response) => {
        navigate("/employeeList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="rounded flex max-w-2xl mx-20 shadow border-b bg-slate-800 my-20">
      <div className="px-8 py-8">
        <div className="font-bold text-2xl tracking-wider text-center">
          <h1> Update 📝 Employee </h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="text-sm px-10">
            First Name
          </label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2 text-slate-800"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="px-10 text-sm">
            Last Name
          </label>
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2 text-slate-800"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="px-10 text-sm">
             Email ID -   
          </label>
          <input
            type="text"
            name="email"
            value={employee.email}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2 text-slate-800"></input>
        </div>

        <div className=" text-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={updateEmployee}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-600 py-2 px-6">
            Update
          </button>
          <button
            onClick={() => navigate("/employeeList")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
