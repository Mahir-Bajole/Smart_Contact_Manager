import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Viewcontact() {
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactData, setContact] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const cardsPerPage = 10;
  const navigate = useNavigate();

  // Edit contact
  const handleEdit = (contact) => {
    navigate(`/user/detail/${contact.id}`, { state: { contact } });
  };

  // Delete contact
  const handleDelete = (contact) => {
    axios.post(
      'http://localhost:8081/user/delete',
      { id: contact.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(() => {
      toast.success("Deleted " + contact.name, { autoClose: 2000 });
      setContact((prev) => prev.filter(c => c.id !== contact.id));
    }).catch((error) => {
      toast.error('Error deleting contact:', error);
    });
  };

  // Toggle favorite
  const handleFavouriteToggle = async (contact) => {
    try {
      const updatedContact = { id: contact.id, favorate: !contact.favorate };
      await axios.post('http://localhost:8081/user/favourate', updatedContact, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedList = contactData.map((c) =>
        c.id === contact.id ? { ...c, favorate: !c.favorate } : c
      );
      setContact(updatedList);

      toast.success(`${contact.name} marked as ${!contact.favorate ? 'favourite' : 'not favourite'}`);
    } catch (error) {
      
      toast.error('Failed to update favourite status');
    }
  };

  // Fetch contacts
  useEffect(() => {
    axios.get('http://localhost:8081/user/allcontact', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const formattedContacts = response.data.map((c) => ({
        id: c.id,
        name: c.name || '',
        email: c.contactemail || '',
        phone: c.phonenumber || '',
        image: c.picture || '',
        address: c.address || '',
        description: c.about || '',
        favorate: c.favorate || false, // ✅ FIXED spelling
        socialLinks: c.socialLinks || [],
      }));
      setContact(formattedContacts);
    }).catch((error) => {
      toast.error('Error fetching contacts:', error);
    });
  }, []);

  // Search & Pagination
  const filteredContacts = contactData.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContacts.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredContacts.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className="flex flex-col h-fit items-center justify-start py-6">
      <h1 className="text-3xl font-bold text-cyan-700 mb-4">Contact List</h1>

      {/* Search Bar */}
      <div className="mb-4 w-3/4 md:w-1/2">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#146889]"
        />
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 px-4 w-full max-w-4xl">
        {currentCards.length > 0 ? (
          currentCards.map((contact) => (
            <div
              key={contact.id}
              className="w-full p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  onClick={() => setSelectedContact(contact)}
                  src={contact.image}
                  alt={contact.name}
                  className="w-16 h-16 rounded-full object-cover cursor-pointer"
                />
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h2 className="text-lg font-semibold">{contact.name}</h2>
                    <p className="text-gray-500">{contact.email}</p>
                    <p className="text-sm text-gray-400">{contact.phone}</p>
                  </div>
                  <div className="mr-10 flex space-x-4 text-xl text-gray-600">
                    <button onClick={() => handleFavouriteToggle(contact)} className="hover:scale-110 transition">
                      {contact.favorate ? (
                        <AiFillHeart className="text-red-500" />
                      ) : (
                        <AiOutlineHeart className="text-gray-400" />
                      )}
                    </button>
                    <button onClick={() => handleEdit(contact)}>
                      <MdEdit className="hover:text-blue-600 cursor-pointer" />
                    </button>
                    <button onClick={() => handleDelete(contact)}>
                      <MdDelete className="hover:text-red-600 cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-8">No contacts found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex mt-6 space-x-2 flex-wrap justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md border text-sm ${
                currentPage === i + 1
                  ? 'bg-[#146889] text-white'
                  : 'bg-white text-[#146889] border-[#146889]'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-2 right-4 text-gray-400 hover:text-black text-xl"
            >
              &times;
            </button>
            <div className="flex flex-col items-center text-center">
              <img
                src={selectedContact.image}
                alt={selectedContact.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{selectedContact.name}</h2>
              <p className="text-gray-500">{selectedContact.email}</p>
              <p className="text-sm text-gray-400 mb-2">{selectedContact.phone}</p>
              <p className="text-gray-700">{selectedContact.description}</p>
              <p className="text-gray-600 mt-2">{selectedContact.address}</p>
              <div className="mt-4 space-y-1 w-full">
                {selectedContact.socialLinks.map((link) => (
                  <div key={link.id}>
                    <strong>{link.title}:</strong>{' '}
                    <a
                      href={link.link}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.link}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewcontact;
