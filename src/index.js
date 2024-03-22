import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/stylesheets/style.scss';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { ChatContextProvider } from './contexts/ChatContext';
import { ToastContainer } from 'react-toastify';
const root = createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition="bounce"
        />
        <ToastContainer />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
