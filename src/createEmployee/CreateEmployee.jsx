import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate, useLocation } from 'react-router-dom';
import { createEmployee, editEmployee } from '../slices/crudSlices';

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Assuming employee to edit is passed via location.state
  const isEditMode = location.state?.employee;

  const [employee, setEmployee] = useState({
    name: '',
    age: '',
    designation: ''
  });

  // Prefill form if editing
  useEffect(() => {
    if (isEditMode) {
      setEmployee(isEditMode);
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
   if (isEditMode) {
    console.log("hii")
      dispatch(editEmployee(employee));
    } else {
      dispatch(createEmployee(employee));
    }

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-xl">
        <form onSubmit={handleUpdate} className="space-y-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 w-full"
          >
            {isEditMode ? 'Update Employee' : 'Create Employee'}
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={employee.age}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              required
            />
          </div>
        </form>
      </div>
    </div>

  );
};

export default CreateEmployee;
