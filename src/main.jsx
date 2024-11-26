import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster, toast } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext/index.jsx'
import { Routes } from './provider/Router.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position='top-right'  />
    <AuthProvider>
    <RouterProvider router={Routes} />
    </AuthProvider>
  </StrictMode>,
)
