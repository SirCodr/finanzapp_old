import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from '@store/index'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer hideProgressBar autoClose={4000} closeOnClick newestOnTop />
    </BrowserRouter>
  </Provider>
  </QueryClientProvider>
)
