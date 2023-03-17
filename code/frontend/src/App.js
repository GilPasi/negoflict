import React from 'react';
import LoginPage from "./pages/LoginPage.js"
import CasePage from "./pages/CasePage.js"
import CaseFormPage from "./pages/CaseFormPage.js"


import useInactivityRedirect from './hooks/useInActiveRediract.js';
import { Route, Routes } from 'react-router-dom'; 
import RequireAuth from './components/Authentication/RequireAuth'
import ChatPage from "./pages/rolePages/mediator/Chatpage.js"
import Layout from './components/general/Layout';
import {UserLandingPage,MediatorLandingPage,SuperUserLandingPage} from './pages/LandingPage';
import './App.css'




 const App=()=> {
  const isActive = useInactivityRedirect();


  return (
    <div className="App">
     
      <Routes>
      
        <Route path='/' element={<Layout/>}>
          {/* public routes */}
         
       
        <Route  path='/login' element={<CasePage/>}/>

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

          <CaseFormPage/>
      
      
          
    </div>
  );
}

export default App;
