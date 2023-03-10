// import WebIM from './WebIM';
import React, { useState, useEffect } from 'react';
import LoginPage from "./pages/LoginPage.js"
import { Route, Routes } from 'react-router-dom'; 
import RequireAuth from './components/Authntication/RequireAuth.js';
import Chatpage from "./pages/rolePages/mediator/Chatpage.js"
import Layout from './components/generals/Layout.js';
import {UserLandingPage,MediatorLandingPage,SuperUserLandingPage} from './pages/LendingPage'
import RequireAuth from './pages/RequireAuth.js';
import Chatpage from "./pages/ChatPage.js"
import './App.css'



 const App=()=> {


  return (
    <div className="App">
     
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* public routes */}
       
        <Route  path='/login' element={<LoginPage/>}/>

        {/* protected routes */}
       
        <Route  path='/' element={<RequireAuth/>}>
          <Route path='user/*' element={<UserLandingPage/>}/>
          <Route path='mediator/*' element={<MediatorLandingPage/>}/>
          <Route path='admin/*' element={<SuperUserLandingPage/>}/>
          <Route path='chat' element={<Chatpage/>}/>
        </Route>
          {/* catch */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
