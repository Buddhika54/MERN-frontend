import React from 'react';
import ReactDOM from 'react-dom/client';   // <-- use 'react-dom/client'
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));  // <-- createRoot instead of render
root.render(
  
  <App/>
);


