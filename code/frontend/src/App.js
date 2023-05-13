import LoginPage from './pages/LoginPage.js';

import useInactivityRedirect from './hooks/useInActiveRediract.js';
import { Route, Routes } from 'react-router-dom'; 
import RequireAuth from './components/Authentication/RequireAuth'
import Layout from './components/general/Layout';
import {UserLandingPage,MediatorLandingPage,SuperUserLandingPage} from './pages/LandingPage';
import './App.css'




 const App=()=> {
  const isActive = useInactivityRedirect();
  

  return(
    <div className="app middle">
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
            </Route>
            ):(<div><h1>not active</h1></div>)}
              {/* catch */}
            
            </Route>
        </Routes>
   
        
    </div>  



)}
export default App;

