// import WebIM from './WebIM';
import React from 'react';
import LoginPage from "./pages/LoginPage.js"
import CasePage from "./pages/CasePage.js"
import ShuttleSwitch from "./components/general/ShuttleSwitch.js"
import { Route, Routes } from 'react-router-dom'; 
import RequireAuth from './components/Authntication/RequireAuth.js';
import ChatPage from "./pages/rolePages/mediator/Chatpage.js"
import Layout from './components/general/Layout';
import {UserLandingPage,MediatorLandingPage,SuperUserLandingPage} from './pages/LandingPage';
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
          <Route path='chat' element={<ChatPage/>}/>
        </Route>
          {/* catch */}
        </Route>
      </Routes>

      <ChatPage isMediator={false} />

    </div>
  );
}

export default App;
