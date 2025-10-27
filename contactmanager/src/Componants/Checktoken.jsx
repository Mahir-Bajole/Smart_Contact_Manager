import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function Checktoken() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.sub);
       
      } catch (err) {
       
        setUsername('');
      }
    }
  }, []);

  return (
    <div>
      {username ? (
        <h2>Welcome, {username}!</h2>
      ) : (
        <h2>No valid token found. Please log in.</h2>
      )}
    </div>
  );
}

export default Checktoken;
