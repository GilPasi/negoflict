import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store, persistor } from './store/index'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route,HashRouter} from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from './components/general/ErrorBoundary';
// import 'bootstrap/dist/css/bootstrap.min.css';
import history from './components/Authentication/History.js';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary >
    <Provider store={store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
      <HashRouter>
        <Routes history={history}>
            <Route path='/*' element={ <App />}/>
        </Routes>
      </HashRouter>
      </PersistGate>
    </Provider>
    </ErrorBoundary>

   
  </React.StrictMode>
);

