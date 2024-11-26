import { useState } from 'react'
import './App.css'
import ProtectedRoute from './component/Protector'
import Dashboard from './component/Dashboard'
function App({ children }) {

  return (
    <>
     <ProtectedRoute>
      <Dashboard/>
     </ProtectedRoute>
    </>
  )
}

export default App
