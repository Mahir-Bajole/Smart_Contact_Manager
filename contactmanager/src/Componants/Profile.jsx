import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function Profile({contact}) {

  


  
  

  const profile = {
    id: contact.userId || "",
    name: contact.name || "",
    email: contact.email || contact.username || "",
    phone: "Not Provided",
    image: contact.profilepic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    coverImage: "https://source.unsplash.com/800x200/?nature,water",
    bio: contact.about || "",
    location: "India",
    website: "https://example.com"
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 mt-20 sm:px-6 lg:px-8">
      <div className="bg-white rounded-b-2xl shadow-2xl p-8 max-w-2xl w-full -mt-16">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            src={profile.image}
            alt={profile.name}
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-4">{profile.name}</h2>
          <p className="text-gray-500 text-sm mt-1">Contact ID: {profile.id}</p>
          <p className="text-gray-600 text-center mt-4">{profile.bio}</p>
          <p className="text-gray-500 mt-2">{profile.location}</p>
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#146889] mt-2 hover:underline"
          >
            {profile.website}
          </a>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">📧 Email:</span>
            <a
              href={`mailto:${profile.email}`}
              className="text-gray-800 hover:text-[#146889] transition"
            >
              {profile.email}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">📱 Phone:</span>
            <a
              href={`tel:${profile.phone}`}
              className="text-gray-800 hover:text-[#146889] transition"
            >
              {profile.phone}
            </a>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
         
        </div>
      </div>
    </div>
  );
}
