// import { useState } from 'react'
// import reactLogo from './assets/images/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { HomePage } from './pages/HomePage/HomePage'
// import { BrowserRouter , Routes, Route } from 'react-router-dom'
// import { DashBoard } from './Components/DashBoard/DashBoard'

//  function App() {
//   return (
//    <BrowserRouter >
//       <Routes>
//         <Route path="/" element={<HomePage/>} />
//         <Route path="/dashboard" element={<DashBoard/>} />
//       </Routes >
//     </BrowserRouter >
//   )
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashBoard } from "./Components/DashBoard/DashBoard";
import { WasteageClassifier } from "./Components/WasteageClassifier/WasteageClassifier";
import { HomePage } from './pages/HomePage/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<DashBoard />}>
          <Route path="wastage-classifier" element={<WasteageClassifier />} />
          <Route path="profile" element={<div>Profile content here</div>} />
          <Route path="settings" element={<div>settings content here</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

