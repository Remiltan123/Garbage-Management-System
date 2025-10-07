import { useState } from 'react'
import reactLogo from './assets/images/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import { DashBoard } from './Components/DashBoard/DashBoard'


function App() {
  return (
   <BrowserRouter >
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
      </Routes >
    </BrowserRouter >
  )
}

export default App;
