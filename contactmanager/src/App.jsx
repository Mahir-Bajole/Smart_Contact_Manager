import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Componants/NavBar'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Addnewcontact from './Componants/Addnewcontact'
import Detail from './Componants/Detail'
import axios from 'axios'
import ProtectedRoute from './Componants/ProtectedRoute'
import Checktoken from './Componants/Checktoken'
import Profile from './Componants/Profile'
import Forgot from './Componants/Forgot'
import SendOtp from './Componants/SendOtp'




function App() {
  
 

  return (
    <div className='w-full h-full  mx-auto'>
     
      
     
     <Routes>
       <Route  path='/' element={<Home />} />
       <Route path='/login' element={<Login />} />
       <Route path='/contact' element={<Contact />} />
       <Route path='/signup' element={<Signup />} />
       <Route path='/check' element={<Checktoken/>} />
       <Route path='/forgot' element={<Forgot/>} />
       <Route path='/otp' element={<SendOtp/>} />
       <Route path='/user/detail/:id' element={<Detail/>} />
       <Route path='/user/dashboard' element={
        
           <Dashboard/>

      
       } />
       

      
       
     </Routes>
   
</div>

  )
}

export default App
