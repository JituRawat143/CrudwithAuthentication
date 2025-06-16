import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'; 
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, showEmployee } from '../slices/crudSlices';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDeleteOutline  } from 'react-icons/md';

const Dashboard = () => {
  const navigatepage = useNavigate();
  const dispatch = useDispatch();
  

   const {employeeData, loading, error} =useSelector(state=>state.employee);
   console.log(employeeData);

 const CreateNewEmployee =()=>{
    navigatepage('/createemployee')
 }
  const handleEdit = (e, employee) => {
    e.preventDefault();
  navigatepage('/createemployee',{state:{employee}});
};

const handleDelete = (id) => {
  console.log("Delete clicked:", id);
  dispatch(deleteEmployee(id));
};

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    navigatepage('/'); 
  };

  // Define columns for DataGrid
  const columns = [
    { field: 'SNo', headerName: 'SI No', width: 90 ,}, 
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'age', headerName: 'Age', width: 110 },
    { field: 'designation', headerName: 'Designation', width: 250 },
    {
  field: 'actions',
  headerName: 'Actions',
  width: 120,
  sortable: false,
  filterable: false,
  hideable: false,
  renderCell: (params) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '10px' }}>
      <button
        onClick={(e) => handleEdit(e, params.row)}
        className="text-blue-600 hover:text-blue-800"
        title="Edit"
      >
        <FaPencilAlt />
      </button>
      <button
        onClick={() => handleDelete(params.row.id)}
        className="text-red-600 hover:text-red-800"
        title="Delete"
      >
        <MdDeleteOutline size={20} />
      </button>
    </div>
  ),
}

  ];
  const rowsdata = employeeData.map((employee,index) => ({
    id: employee.id,
    SNo: index+1,
    name: employee.name,
    age: employee.age,
    designation: employee.designation,
  }));

  const modifiedColumns = columns.map((col) => ({
    ...col,
    hideable: true,
  }));

  
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({}); 

  useEffect(()=>{
    dispatch(showEmployee());
  },[])
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">Employee List</h1>
      </div>
      <div className="flex flex-col items-center bg-white p-6 sm:p-8 rounded-xl shadow-2xl max-w-6xl mx-auto">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => CreateNewEmployee()} 
          >
            Create New Employee
          </button>
          <button
            className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div style={{width: '100%' }} className="rounded-lg overflow-hidden border border-gray-200">
          <DataGrid
            rows={rowsdata}
            columns={modifiedColumns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } }, // Default page size
            }}
            pageSizeOptions={[5, 10, 20, 30, 50, 100]} // Options for page size dropdown
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={setColumnVisibilityModel}
            showToolbar={true}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#374151',
                 color: '#2D3748', 
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#F9FAFB', 
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#E5E7EB',
              },
              '& .MuiDataGrid-cell': {
                borderColor: '#E5E7EB',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#F3F4F6',
              },
              borderRadius: '8px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;