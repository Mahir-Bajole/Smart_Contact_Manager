import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Favourates() {
  const [fav, setFav] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:8081/user/getfavorate', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
     
        setFav(response.data);
      })
      .catch((error) => {
        toast.error(error)
      });
  }, [fav]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#146889] mb-4">Favourite Contacts</h1>

      {fav.length === 0 ? (
        <p className="text-gray-500">No favourite contacts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fav.map((contact) => (
            <div
              key={contact.id}
              className="bg-yellow-100 p-4 rounded-lg shadow-md border border-yellow-300"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={contact.picture}
                  alt={contact.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{contact.name}</h3>
                  <p className="text-gray-600">{contact.contactemail}</p>
                  <p className="text-sm text-gray-500">{contact.phonenumber}</p>
                  <p className="text-sm text-gray-400">{contact.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourates;
