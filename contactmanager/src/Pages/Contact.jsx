import React, { useState } from 'react';
import Footer from '../Componants/Footer';
import NavBar from '../Componants/NavBar';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    alert("Your message has been sent!");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="w-full md:w-[60%] mx-auto bg-white shadow-2xl rounded-3xl p-10">
          <h2 className="text-4xl font-bold text-center mb-8 text-[#146889]">Contact Us</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#146889]"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#146889]"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-xl px-5 py-3 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#146889]"
            />
            <button
              type="submit"
              className="bg-[#146889] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#10566f] transition-all shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
