import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function SendOtp() {
    const [otp, setotp] = useState("");

  
  const handlesubmit = () => {

     axios.post("http://localhost:8081/sendotp",{otp},{
        
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
    <div className="min-h-screen flex items-center justify-center bg-zinc-800 bg-opacity-90">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Verify OTP</h1>
        <p className="text-sm text-gray-600 text-center">
          Please enter the 4-digit OTP sent to your email address.
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>setotp(e.target.value)}
          maxLength="4"
          className="w-full text-center tracking-widest text-xl px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button onClick={()=>handlesubmit()}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Verify OTP
        </button>

        <p className="text-xs text-gray-500 mt-2">
          Didn’t receive the code? <span className="text-blue-600 cursor-pointer hover:underline">Resend</span>
        </p>
      </div>
    </div>
  );
}

export default SendOtp
