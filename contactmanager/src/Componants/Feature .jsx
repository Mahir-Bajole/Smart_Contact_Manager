import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserPlus,
  FaMoneyBillWave,
  FaLock,
  FaEnvelope,
} from 'react-icons/fa';
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';

const Feature = ({isdark,toggleModehome}) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/user/dashboard'); // Ensure '/dashboard' is a valid route
    } else {
      navigate('/login'); // Ensure '/login' is a valid route
    }
  };

 


  const features = [
    {
      icon: <FaUserPlus size={40} className="text-blue-600" />,
      title: 'Contact Management',
      desc: 'Store and organize user contacts easily and efficiently.',
    },
    {
      icon: <FaMoneyBillWave size={40} className="text-yellow-500" />,
      title: 'Payments',
      desc: 'Perform secure payments and manage transactions with ease.',
    },
    {
      icon: <FaLock size={40} className="text-green-600" />,
      title: 'Secure Storage',
      desc: 'All your data is encrypted and stored safely.',
    },
    {
      icon: <FaEnvelope size={40} className="text-red-500" />,
      title: 'Send Direct Email',
      desc: 'Quickly send emails directly from the application.',
    },
  ];

  return (
    <div className={`w-[90%] mx-auto py-12 ${isdark && 'bg-gray-800'}`}>
      <h2 className={`text-3xl font-bold text-center mb-10 text-gray-800 ${isdark==false ?'text-gray-800':'text-white'}`}>App Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Let’s Get Started Button */}
      <div className="text-center mt-12">
        <button
          className="bg-[#146889] text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#10566f] transition duration-300"
          onClick={() => handleSubmit()}
        >
          Let’s Get Started
        </button>
      </div>
    </div>
  );
};

export default Feature;
