import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Detail() {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const location = useLocation();
  const contact = location.state?.contact;

  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState(contact);

  if (!contact) return <p>Contact data not found.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  const handleSave = () => {
  
    setIsEditing(false);

    const backendFormattedContact = {
      id: editedContact.id,
      name: editedContact.name,
      contactemail: editedContact.email,
      phonenumber: editedContact.phone,
      picture: editedContact.image,
      address: editedContact.address,
      about: editedContact.description,
      favourite: editedContact.favorate,
      socialLinks: editedContact.socialLinks,
    };

    axios
      .post(
        'http://localhost:8081/user/update',  backendFormattedContact ,// Correct payload format
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        
        }
      ).then(response=>{
        toast.success(response);
      }).catch(error=>{
        toast.error(error)
      })
    

    
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full shadow-lg border-4 border-[#146889] mb-4"
            src={editedContact.image}
            alt={editedContact.name}
          />
          {isEditing ? (
            <input
              className="text-xl font-bold text-center border border-gray-300 rounded-md px-2 py-1 mb-2"
              type="text"
              name="name"
              value={editedContact.name}
              onChange={handleChange}
            />
          ) : (
            <h2 className="text-3xl font-bold text-[#146889] mb-2">{editedContact.name}</h2>
          )}
          <p className="text-gray-600 text-sm">Contact ID: {editedContact.id}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">📧 Email:</span>
            {isEditing ? (
              <input
                className="border border-gray-300 rounded-md px-2 py-1 w-1/2"
                type="email"
                name="email"
                value={editedContact.email}
                onChange={handleChange}
              />
            ) : (
              <span className="text-gray-800">{editedContact.email}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">📱 Phone:</span>
            {isEditing ? (
              <input
                className="border border-gray-300 rounded-md px-2 py-1 w-1/2"
                type="text"
                name="phone"
                value={editedContact.phone}
                onChange={handleChange}
              />
            ) : (
              <span className="text-gray-800">{editedContact.phone}</span>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#146889] text-white px-6 py-2 rounded-full hover:bg-cyan-800 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
