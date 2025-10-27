import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterStatus from './RegisterStatus';
import { useNavigate } from 'react-router-dom';

export default function AddNewContact() {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");


  const [formData, setFormData] = useState({
    name: '',
    contactemail: '',
    phonenumber: '',
    description: '',
    address: '',
    linkedin: '',
    github: '',
    picture: null, // for storing image file
    favorite: false,
  });

  const [preview, setPreview] = useState(null); // for image preview

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === 'picture' && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, picture: file });
      setPreview(URL.createObjectURL(file)); // Show image preview
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const navigate=useNavigate();

  const handleClear = () => {
    setFormData({
      name: '',
      contactemail: '',
      phonenumber: '',
      description: '',
      address: '',
      linkedin: '',
      github: '',
      picture: null,
      favorite: false,
    });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("Token is missing. Cannot authenticate request.");
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await axios.post(
        "http://localhost:8081/user/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      toast.success("Contact Added Successfully", { autoClose: 2000 });
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        navigate("/user/dashboard/")

       
      }, 1000);

      handleClear();
      
    } catch (error) {
      
      toast.error("Failed to add contact");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-4">
     { <RegisterStatus loading={loading} success={success} error={error} />}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-[#146889] mb-6 text-center">Add New Contact</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3" required />

          <input type="email" name="contactemail" placeholder="Email" value={formData.contactemail} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3" required />

          <input type="tel" name="phonenumber" placeholder="Phone Number" value={formData.phonenumber} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3" required />

          <textarea name="description" rows="3" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3"></textarea>

          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3" />

          <input type="url" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3" />

          <input type="url" name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3" />

          {/* Image Upload */}
          <div className="flex flex-col items-center space-y-3">
            <input type="file" name="picture" accept="image/*" onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-2" />
            {preview && (
              <img src={preview} alt="Preview" className="w-100 h-100 rounded-2xl object-cover border" />
            )}
          </div>

          {/* Favorite Checkbox */}
          <div className="flex items-center space-x-2 mt-4">
            <input type="checkbox" name="favorite" checked={formData.favorite} onChange={handleChange} className="h-4 w-5" />
            <span className="text-zinc-600 text-lg">Is it your favorite?</span>
          </div>

          <div className="flex justify-between mt-6">
            <button type="submit" className="bg-[#146889] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#10566f] transition">Add Contact</button>
            <button type="button" onClick={handleClear} className="bg-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600 transition">Clear</button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
