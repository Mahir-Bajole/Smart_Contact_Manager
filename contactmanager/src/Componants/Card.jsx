import React from 'react';
import { FaRegEdit, FaRegStar } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';

function Card({ contact, setActiveSection,key }) {
  
    const { id,image, name, email, phone } = contact;
   

    const handledelete=(id)=>{
     
      const token=localStorage.getItem('token');

      axios.post("http://localhost:8081/user/delete",{id}, {
        headers: {
         
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        const userData= response.data;
        toast.success("success");
        
      
        
       
      })
      .catch(error => {
       toast.error("Error fetching user profile:", error);
       
      })
      
    }
    
  
    return (
      <div
       
        className='h-20 text-xl font-medium items-center px-6 shadow-2xl flex justify-between rounded w-full text-zinc-700 bg-white'
      >
        <div className='flex items-center gap-20 w-full'>
          <div className='w-20 flex justify-center'>
            <img  onClick={() => setActiveSection('detail')} className="w-14 h-14 rounded-full" src={image} alt={name} />
          </div>
          <div className='w-40'>{name}</div>
          <div className='w-60 truncate'>{email}</div>
          <div className='w-40 truncate'>{phone}</div>
        </div>
  
        <div className='flex gap-4 pr-4'>
          <FaRegStar className='text-yellow-500 cursor-pointer' />
          <FaRegEdit className='text-green-400 cursor-pointer' />
          <MdDeleteOutline onClick={()=>handledelete(id)} className='text-red-500 cursor-pointer' />
        </div>
      </div>
    );
  }
  

export default Card;
