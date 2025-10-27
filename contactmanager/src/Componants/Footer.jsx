import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#146889] mb-10 text-white py-6 mt-16">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-center md:text-left mb-4 md:mb-0 font-medium">
          © {new Date().getFullYear()} Smart Contact Manager. All rights reserved.
        </p>
        <div className="flex gap-6 text-xl">
          <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
          <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
          <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
          <a href="#" className="hover:text-gray-300"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
