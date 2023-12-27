import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Pages/Navbar/Navbar'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
    <Navbar/>
     <Outlet/>
    
    </>
  )
}

export default App
