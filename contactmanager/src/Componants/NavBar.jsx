import React from 'react';
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';

function NavBar({ toggleModehome, isdark }) {
  const location = useLocation();

  const token=localStorage.getItem('token');

  const handleToggle = () => {
    toggleModehome(!isdark);
    document.body.classList.toggle('bg-gray-900');
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-cyan-700 via-teal-600 to-sky-700 py-3 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-4">
          <img
            className="rounded-full h-14 w-14 shadow-lg"
            src="https://images.sftcdn.net/images/t_app-icon-m/p/a9448905-e5c6-4555-9b6c-52607316cb70/2380358566/smart-contact-manager-logo"
            alt="Logo"
          />
          <Link to="/" className="text-white text-xl font-bold tracking-wide">Smart Contacts</Link>
        </div>

        <div className="flex items-center gap-8 text-white font-semibold text-lg">
          {location.pathname === '/' && (
            <>
              <Link to="/contact" className="hover:text-yellow-300 transition duration-300">Contact</Link>
              <Link to={token?'/user/dashboard':'/login'} className="hover:text-yellow-300 transition duration-300">Login</Link>
              <Link to={token?'/user/dashboard':'/signup'}  className="hover:text-yellow-300 transition duration-300">Sign Up</Link>
              <button 
                onClick={handleToggle}
                className="flex items-center gap-1 text-sm bg-white/20 px-3 py-2 rounded-lg hover:bg-white/30 transition duration-300"
              >
                {isdark ? <CiDark size={20} /> : <MdDarkMode size={20} />}
                <span className="hidden md:inline">Dark</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
