import axios from 'axios';
import React, { useEffect,useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "../index.css"


const Login = () => {
  
  const navigatepage = useNavigate();
   const logoutTimerRef = useRef(null); 
  // const [logoutTimer, setLogoutTimer] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
 
  

   
  function validateAlreadyLoggedIn(loginInput) {
   const loginData = "http://localhost:3001/users"
   const localUserId = localStorage.getItem('user-token');
    console.log(loginData);
     if (localUserId) {
    if(localUserId===loginInput.username){
      if(window.confirm('you are already logged in, Do you want to continue')){
        navigateLoginSuccess();
      }else{
        localStorage.clear();
        navigatepage('/')
      }
    }else{
      axios.get(loginData).then(response=>{
        const tempdata =response.data;
        const userexist = tempdata.some(data=>data.username===loginInput.username && data.password===loginInput.password);
        if(userexist){
          console.log(userexist);
          localStorage.setItem('user-token',loginInput.username);
          navigateLoginSuccess();
        }else{
          alert("some error")
        }
      }).catch(error=>{
        console.error("error fetching user: ",error);
        alert("a error is accoured while checking login credential")
      })
    }
  }else {
    axios.get(loginData).then(response => {
      const tempdata = response.data;
      const userexist = tempdata.some(data1 =>
        data1.username.trim().toLowerCase() === loginInput.username.trim().toLowerCase() &&
        data1.password.trim().toLowerCase() === loginInput.password.trim().toLowerCase()
      );
      if(userexist){
        localStorage.setItem('user-token',loginInput.username)
        navigateLoginSuccess();
      }else{
        alert('incorrect username or password');
            setFormData({
              username: '',
              password: ''
            });
      }
      console.log('userExists:', userexist);
     }).catch(error=>{
       console.error('Error fetching users:', error);
          alert('An error occurred while checking login credentials.');
     })
  }
  }

  const handleLogout = () => {
  clearTimeout(logoutTimerRef.current);

  // Remove activity listeners
  window.removeEventListener('mousemove', resetLogoutTimer);
  window.removeEventListener('keypress', resetLogoutTimer);
  window.removeEventListener('click', resetLogoutTimer);

  localStorage.removeItem('user-token');

  alert('You have been logged out due to fix loggedin time limit.');

  navigatepage('/');
};


 const resetLogoutTimer = () => {
    clearTimeout(logoutTimerRef.current); 
    logoutTimerRef.current = setTimeout(() => {
      handleLogout(); 
    }, 600000); // 10 minutes
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
  const form = e.currentTarget;

  if (!form.checkValidity()) {
    return;
  }

  e.preventDefault();
console.log(formData);

  if (formData.username.trim() && formData.password.trim()) {
    validateAlreadyLoggedIn(formData);
  } else {
    alert("Please enter valid credentials!");
  }
};

const navigateLoginSuccess = () => {
  window.addEventListener('mousemove', resetLogoutTimer);
  window.addEventListener('keypress', resetLogoutTimer);
  window.addEventListener('click', resetLogoutTimer);

  // // Start logout timer
  // const timer = setTimeout(() => {
  //   handleLogout();
  // }, 60000); // 10 minutes

  resetLogoutTimer();
  navigatepage('/dashboard');
  alert("login success");

};

useEffect(() => {
  clearTimeout(logoutTimerRef.current);
  window.removeEventListener('mousemove', resetLogoutTimer);
  window.removeEventListener('keypress', resetLogoutTimer);
  window.removeEventListener('click', resetLogoutTimer);
}, []);


                           

  return (
  <div className="h-screen flex justify-center items-center bg-gray-100">
  <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
    <div className="flex items-center justify-center mb-6">
      <FaUser className="text-4xl text-blue-600" />
    </div>
    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Sign In
      </button>
    </form>
  </div>
</div>


  );
};

export default Login;
