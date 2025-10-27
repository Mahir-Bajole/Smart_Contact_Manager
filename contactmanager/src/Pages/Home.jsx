import React, { useState } from 'react'
import SlidingImage from '../Componants/SlidingImage'
import Feature from '../Componants/Feature '
import NavBar from '../Componants/NavBar'
import Footer from '../Componants/Footer'
function Home() {
  const [isdark,setdark]=useState(true);
  const toggleMode=()=>{
    setdark(!isdark);
  }
  return (
    <div className={`w-full  ${isdark ? 'bg-gray-800':'bg-white'}`}>
         <NavBar isdark={isdark} toggleModehome={toggleMode} />
        <SlidingImage/>
        <Feature isdark={isdark} toggleModehome={toggleMode}/>
        <Footer/>
      
    </div>
  )
}

export default Home
