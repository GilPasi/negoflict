import React from 'react';
import LoginPage from './pages/LoginPage.js';
import CaseFormPage from './pages/CaseFormPage.js';
import CasePage from './pages/CasePage.js';
import AddUserPage from './pages/AddUserPage.js';


import useInactivityRedirect from './hooks/useInActiveRediract.js';
import { Route, Routes } from 'react-router-dom'; 
import RequireAuth from './components/Authentication/RequireAuth'
import ChatPage from "./pages/rolePages/mediator/ChatPage.js"
import Layout from './components/general/Layout';
import {UserLandingPage,MediatorLandingPage,SuperUserLandingPage} from './pages/LandingPage';
import './App.css'
import useNodeS from './hooks/useNodeS.js';




 const App=()=> {
  const isActive = useInactivityRedirect();
  

  return (
    <div className="app">      
      <Routes>
            
      <Route path='/' element={<Layout/>}>
        {/* public routes */}
      
      
      <Route  path='/login' element={<LoginPage/>}/>
      
      {/* protected routes */}
      {isActive?(
      
      <Route  path='/' element={<RequireAuth/>}>
        <Route path='user/*' element={<UserLandingPage/>}/>
        <Route path='mediator/*' element={<MediatorLandingPage/>}/>
        <Route path='admin/*' element={<SuperUserLandingPage/>}/>
        <Route path='chat' element={<ChatPage/>}/>
      </Route>
      ):(<div><h1>not active</h1></div>)}
        {/* catch */}
      
      </Route>
      </Routes>          
    </div>
  );
}

export default App;


