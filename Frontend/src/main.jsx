import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { FavoritasProvider } from './context/FavoritosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FavoritasProvider>
        <App />
      </FavoritasProvider>
    </AuthProvider>
  </StrictMode>,
)
