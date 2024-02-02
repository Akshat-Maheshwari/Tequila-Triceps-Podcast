import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import {FavProvider} from './contexts/FavContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
    <FavProvider>
      <App /> 
    </FavProvider>
  </AuthProvider>
 
  </React.StrictMode>
);