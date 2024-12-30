import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/main';
import DailyPostDetails from './pages/postdetails';
import './App.css';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/getposts" element={<DailyPostDetails/>}/>
    </Routes>

    </BrowserRouter>
  )
}

export default App