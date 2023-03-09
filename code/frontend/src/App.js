// import WebIM from './WebIM';
import React, { useState, useEffect } from 'react';
import LoginPage from "./pages/LoginPage.js"
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './pages/RequireAuth.js';
import ShuttleSwitch from "./components/generals/ShuttleSwitch.js";
import ToolBar from "./components/generals/ToolBar.js";
import Message from "./components/generals/Message.js"


import './App.css'



 const App=()=> {


  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>

        <Route path='/welcome' element={<RequireAuth/>}>
              
        </Route>
        
      </Routes>

      
        <ToolBar conflictName="A political conflict" id="100777"/>
        <ShuttleSwitch/>
        <Message />


    </div>
  );
}

export default App;
