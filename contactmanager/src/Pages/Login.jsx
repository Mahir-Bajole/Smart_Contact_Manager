import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle, FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {

  const [email,setemail]=useState();
  const [password,setpassword]=useState();
  const handleSubmit = () => {
    axios.post("http://localhost:8081/token", {
      email: email,
      password: password,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      const token = response.data.token;
      console.log("Login success", token);
  
      
      localStorage.setItem("token", token);
  
    
      window.location.href = "/user/dashboard"; 
    })
    .catch(error => {
      console.error("Login failed", error.response?.data || error.message);
      toast.error("Invalid Credentials");
    });
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-[#146889] mb-2">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Login to your account</p>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-5">
          {/* Email Input */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#146889] bg-white">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              onChange={(e)=>setemail(e.target.value)}
              name="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#146889] bg-white">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              onChange={(e)=>setpassword(e.target.value)}
              name="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#146889] text-white py-3 rounded-xl hover:bg-[#10566f] transition-all shadow-md font-semibold"
          >
            Login
          </button>
        </form>

   

       
        {/* Signup Prompt */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#146889] font-medium hover:underline">
            Sign up
          </a>
        </p>

         {/* Signup Prompt */}
         <p className="mt-6 text-sm text-center text-gray-600">
          Forgot Password?{" "}
          <a href="/forgot" className="text-[#146889] font-medium hover:underline">
           Get Password 
          </a>
        </p>
      </div>
    </div>
  );
}
