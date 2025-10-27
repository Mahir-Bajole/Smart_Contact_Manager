import React from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';

function Otp() {
    const [useremail, setemail] = useState("");

    const token =localStorage.getItem('token');
  const handlesubmit = () => {

     axios.post("http://localhost:8081/sendotp",{useremail},{
        
        headers: {
          'Content-Type': 'application/json',
       
        },
      
}).then(response=>{
    toast.success("send")
}).catch(error => {
    console.log(error);
    const message = error.response?.data || "Something went wrong!";
    toast.error(message);
  });
}
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-700 bg-opacity-85">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Forgot Password</h1>
      <p className="text-sm text-gray-600 text-center">
       Enter the otp Which is send on your email
      </p>
      <input
        type="email"
        value={useremail} // Fixed here
        onChange={(e) => setemail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handlesubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Send OTP
      </button>
    </div>
  </div>
  )
}

export default Otp
