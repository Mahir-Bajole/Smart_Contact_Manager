import React, { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaUser } from "react-icons/fa";
import axios from "axios";
import RegisterStatus from "../Componants/RegisterStatus";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function Signup() {
  const [userform, setform] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    image: null,
    imagePreview: null,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const formData = new FormData();
    formData.append("name", userform.name);
    formData.append("email", userform.email);
    formData.append("password", userform.password);
    formData.append("about", userform.about);
    if (userform.image) {
      formData.append("image", userform.image);
    }

    axios
      .post("http://localhost:8081/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
       
        setform({
          name: "",
          email: "",
          password: "",
          about: "",
          image: null,
          imagePreview: null,
        });
        setLoading(false);
        setSuccess(true);
        const redirectUrl = response.data;
        setTimeout(() => {
          setSuccess(false);
          navigate(redirectUrl);
        }, 2000);
      })
      .catch((error) => {
     
        const message = error.response?.data?.message || "Registration failed. Please try again.";
        toast.error(message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 relative">
      {/* Status Overlay */}
      <RegisterStatus loading={loading} success={success} error={error} />

      {/* Signup Form */}
      <div
        className={`bg-white p-10 lg:py-8 rounded-3xl shadow-2xl w-full max-w-md lg:max-w-2xl transition-opacity duration-300 ${
          loading ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        <h2 className="text-4xl font-bold text-center text-[#146889] mb-2">Create Account</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign up to get started</p>

        <form onSubmit={handlesubmit} className="space-y-5">
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              value={userform.name}
              onChange={(e) => setform({ ...userform, name: e.target.value })}
              placeholder="Username"
              className="w-full outline-none bg-transparent text-sm"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              value={userform.email}
              onChange={(e) => setform({ ...userform, email: e.target.value })}
              placeholder="Email"
              className="w-full outline-none bg-transparent text-sm"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              value={userform.password}
              onChange={(e) => setform({ ...userform, password: e.target.value })}
              placeholder="New Password"
              className="w-full outline-none bg-transparent text-sm"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white">
            <label className="text-gray-400 mr-2">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setform({
                    ...userform,
                    image: file,
                    imagePreview: URL.createObjectURL(file),
                  });
                }
              }}
              className="w-full text-sm bg-transparent outline-none"
            />
          </div>

          {userform.imagePreview && (
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
              <img
                src={userform.imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto border shadow"
              />
            </div>
          )}

          <textarea
            placeholder="Tell us about yourself..."
            rows="3"
            value={userform.about}
            onChange={(e) => setform({ ...userform, about: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none text-sm resize-none"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#146889] text-white py-3 rounded-xl hover:bg-[#10566f] transition-all shadow-md font-semibold"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500">or</div>

        <div className="mt-5 space-y-3">
          <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition font-medium shadow-sm">
            <FaGoogle /> Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-xl hover:bg-gray-800 transition font-medium shadow-sm">
            <FaGithub /> Sign up with GitHub
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-[#146889] font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
