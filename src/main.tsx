import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <ToastContainer hideProgressBar autoClose={4000} closeOnClick newestOnTop />
  </BrowserRouter>
)
