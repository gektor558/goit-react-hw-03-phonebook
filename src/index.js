import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App/App';
import './index.css';
import { createGlobalStyle } from 'styled-components';
import { ToastContainer } from 'react-toastify';

const Global = createGlobalStyle`
* {
       margin:0;
       padding:0;
       box-sizing:border-box;
       }`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer autoClose={1500} />
    <Global />
    <App />
  </React.StrictMode>
);