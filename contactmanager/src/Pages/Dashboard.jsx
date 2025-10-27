import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import {
  FaUserPlus,
  FaAddressBook,
  FaHeart,
  FaUser,
  FaMoon,
  FaCommentDots,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../Componants/NavBar';
import AddNewContact from '../Componants/Addnewcontact';
import Viewcontact from '../Componants/Viewcontact'
import Favourates from '../Componants/Favourates'
import Feedback from '../Componants/Feedback';
import Profile from '../Componants/Profile';
import Detail from '../Componants/Detail';
import axios from 'axios';
import ChangePassword from '../Componants/ChangePassword';

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('viewcontact');
  const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('bg-gray-900');
  };

  const navItems = [
    { label: 'Add Contact', icon: <FaUserPlus />, key: 'newcontact' },
    { label: 'View Contact', icon: <FaAddressBook />, key: 'viewcontact' },
    { label: 'Favourite', icon: <FaHeart />, key: 'favourite' },
    { label: 'Profile', icon: <FaUser />, key: 'profile' },
    { label: 'Change Password', icon: <FaUser />, key: 'change' },
   
  ];

  const [contact, setContact] = useState({
    about: "",
    name: "",
    email: "",
    profilepic: "",
    // other fields...
  });
   

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const email = decoded.sub;

        axios.post("http://localhost:8081/user/profile", { email }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        .then(response => {
          const userData= response.data;
        
          
          setContact(userData);
        })
        .catch(error => {
        
          // Handle token expiration (example: redirect to login)
          if (error.response && error.response.status === 401) {
            handleLogout();
          }
        });
      } catch (err) {
        toast.error(err)
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, []);
 

  const baseClasses =
    'flex items-center gap-3 text-lg font-medium px-4 py-2 rounded-md transition-all duration-200 cursor-pointer';

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      
      {/* Sidebar (Fixed Left) */}
      <aside className={`w-64 h-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-6`}>
        <div className="flex flex-col items-center mb-6">
          <img
            src={contact.profilepic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
            alt="Profile"
            className="h-40 w-40 rounded-full border-4 border-[#146889] shadow-lg mb-3"
          />
          <h2 className="text-xl font-semibold text-[#146889]">{contact.name}</h2>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <div
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`${baseClasses} ${
                activeSection === item.key
                  ? 'bg-[#146889] text-white'
                  : 'hover:bg-[#146889] hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}

          <div
            onClick={toggleMode}
            className={`${baseClasses} hover:bg-[#146889] hover:text-white`}
          >
            <FaMoon />
            <span>Dark Mode</span>
          </div>

          <Link
            onClick={(e) => { e.preventDefault(); handleLogout(); }}
            className={`${baseClasses} hover:bg-[#146889] hover:text-white`}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex flex-col flex-1 h-screen">
        
        {/* Navbar (Sticky Top) */}
        <div className="sticky top-0 z-10">
          <NavBar />
        </div>

        {/* Main Content (Scrolls) */}
        <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
          {activeSection === 'newcontact' && <AddNewContact />}
          {activeSection === 'viewcontact' && <Viewcontact setActiveSection={setActiveSection} />}
          {activeSection === 'favourite' && <Favourates />}
          
          {activeSection === 'profile' && <Profile contact={contact} />}
          {activeSection === 'detail' && <Detail />}
          {activeSection === 'change' && <ChangePassword />}
        </div>
      </div>
    </div>
  );
}
