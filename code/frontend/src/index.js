import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store/index'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import AddUserPage from "./pages/AddUserPage.js"
import CaseFormPage from "./pages/CaseFormPage.js"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path='/test' element={<CaseFormPage/>}/>
            <Route path='/*' element={ <App />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
   
  </React.StrictMode>
);

