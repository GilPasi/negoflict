import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store, persistor } from './store/index'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route,HashRouter} from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
// import 'bootstrap/dist/css/bootstrap.min.css';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
      <HashRouter>
        <Routes>
            <Route path='/*' element={ <App />}/>
        </Routes>
      </HashRouter>
      </PersistGate>
    </Provider>

   
  </React.StrictMode>
);

