// import WebIM from './WebIM';
import React, { useState, useEffect } from 'react';
import LoginPage from "./pages/LoginPage.js"
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './pages/RequireAuth.js';
import Chatpage from "./pages/ChatPage.js"
import CasePage from "./pages/CasePage.js"



import './App.css'



 const App=()=> {


  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>

        <Route path='/welcome' element={<RequireAuth/>}>
              
        </Route>
        
      </Routes>

      <CasePage />
    </div>
  );
}

export default App;
