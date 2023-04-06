import React from 'react';
import LoginPage from './pages/LoginPage.js';
import ChatPage from './pages/rolePages/mediator/ChatPage_.js';
 
import useInactivityRedirect from './hooks/useInActiveRediract.js';
import { Route, Routes } from 'react-router-dom'; 
import RequireAuth from './components/Authentication/RequireAuth'

import Layout from './components/general/Layout';
import {UserLandingPage,MediatorLandingPage,SuperUserLandingPage} from './pages/LandingPage';
import './App.css'
import Chat from 'agora-chat-uikit/lib/EaseChat/chat/index.js';

import AddMediatorPage from './pages/AddMediatorPage';
import AddUserPage from './pages/AddUserPage';
import CaseFormPage from './pages/CaseFormPage.js';
import CasePage from './pages/CasePage.js';
import SystemOptionsPage from './pages/SystemOptionsPage.js';
import Loader from './components/general/Loader.js';




 const App=()=> {
  const isActive = useInactivityRedirect();
   return (
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
            {/* <Route path='chat' element={<ChatPage/>}/> */}
          </Route>
          ):(<div><h1>not active</h1></div>)}
            {/* catch */}
          
          </Route>
        </Routes>
  );
}
export default App;

