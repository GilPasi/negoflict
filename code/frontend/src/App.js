import React from 'react';
import LoginPage from './pages/LoginPage.js';
import useInactivityRedirect from './hooks/useInActiveRediract.js';
import { Route, Routes } from 'react-router-dom'; 
import RequireAuth from './components/Authentication/RequireAuth'
import ChatPage from "./pages/rolePages/mediator/Chatpage.js"
import Layout from './components/general/Layout';
import {UserLandingPage,MediatorLandingPage,SuperUserLandingPage} from './pages/LandingPage';
import './App.css'
import useNodeS from './hooks/useNodeS.js';
import AddUserPage from './pages/AddUserPage.js';
import LandingPage from './pages/LandingPage.js';
import CaseFormPage from './pages/CaseFormPage.js';
import CasePage from './pages/CasePage.js';




 const App=()=> {
  const isActive = useInactivityRedirect();
  

  return (
    <div className="App">
     


        {/* <AddUserPage/> */}
        <CaseFormPage/>
        {/* <CasePage/> */}
    </div>
  );
}

export default App;
