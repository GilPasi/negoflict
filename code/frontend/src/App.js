// import WebIM from './WebIM';
import React, { useState, useEffect } from 'react';
import LoginPage from "./pages/LoginPage.js"
import { Route, Routes } from 'react-router-dom';
import Welcom from './pages/Welcom.js';
import RequireAuth from './pages/RequireAuth.js';


import './App.css'


 const App=()=> {


  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>


        <Route element={<RequireAuth/>}>
            <Route path='welcome' element={<Welcom/>}/>
        </Route>
        
      </Routes>
      
        
       

    </div>
  );
}

export default App;
