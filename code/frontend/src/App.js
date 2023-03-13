// import WebIM from './WebIM';
import React from 'react';
import LoginPage from "./pages/LoginPage.js"



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
       
        <Route  path='/login' element={<LoginPage/>}/>

        {/* protected routes */}
        {isActive?(
       
        <Route  path='/' element={<RequireAuth/>}>
          <Route path='user/*' element={<UserLandingPage/>}/>
          <Route path='mediator/*' element={<MediatorLandingPage/>}/>
          <Route path='admin/*' element={<SuperUserLandingPage/>}/>
          <Route path='chat' element={<ChatPage/>}/>
        </Route>
        ):(<div>not active</div>)}
          {/* catch */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
