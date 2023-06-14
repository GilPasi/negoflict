import LoginPage from './pages/LoginPage.js';
import useInactivityRedirect from './hooks/useInActiveRediract.js';
import { Route, Routes } from 'react-router-dom'; 
import RequireAuth from './components/Authentication/RequireAuth'
import Layout from './components/general/Layout';
import {UserLandingPage,MediatorLandingPage,SuperUserLandingPage} from './pages/LandingPage';
import './App.css'
import Unauthorised from './components/Authentication/Unauthorised'
import SettingsPage from './components/general/SettingsPage.js';
import TermsOfUse from './pages/TermsOfUse.js';



 const App=()=> {
  const isActive = useInactivityRedirect();
  
  return(
    <div className="app middle">
        <Routes>
          <Route path='/' element={<Layout/>}>
          <Route path='/terms' element={<TermsOfUse/>}/>
            {/* public routes */}
 
              <Route  path='/login' element={<LoginPage/>}/>

              
              {/* protected routes */}
              {isActive?(

            <Route  path='/' element={<RequireAuth/>}>
              <Route path='/:role/settings' element={<SettingsPage/>}/>
              <Route path='user/*' element={<UserLandingPage/>}/>
              <Route path='mediator/*' element={<MediatorLandingPage/>}/>
              <Route path='admin/*' element={<SuperUserLandingPage/>}/>
             
            </Route>
            ):(<div><h1>not active</h1></div>)}
              {/* catch */}
            
             <Route path='unauthorised/*' element={<Unauthorised/>} />
             <Route path='info/' element={<p>version 4 date: 14/6 time: 10:40</p>}/>
            
            </Route>
      
        </Routes>
        
    </div>  



)}
export default App;

