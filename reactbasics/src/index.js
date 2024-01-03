import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Chai from './Chai'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <Chai/>
    <App />
    </>
  </React.StrictMode>
);

