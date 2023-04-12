import LoginPage from './pages/LoginPage.js';
import useInactivityRedirect from './hooks/useInActiveRediract.js';
import { Route, Routes } from 'react-router-dom'; 
import RequireAuth from './components/Authentication/RequireAuth'
import Layout from './components/general/Layout';
import {UserLandingPage,MediatorLandingPage,SuperUserLandingPage} from './pages/LandingPage';
import './App.css'

import ChatView from './components/chat/ChatView';


 const App=()=> {
  const isActive = useInactivityRedirect();
  

  return(
<<<<<<< HEAD
    <div>
      <Routes>
          <Route path='/' element={<Layout/>}>
            {/* public routes */}
=======
    <div className="app">
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* public routes */}
>>>>>>> ae474cd61ba0cdd88f321a77fb95a10e87318faa

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
          
<<<<<<< HEAD
          </Route>
      </Routes>      
=======
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
>>>>>>> ae474cd61ba0cdd88f321a77fb95a10e87318faa
    </div>
  )
}
export default App;

