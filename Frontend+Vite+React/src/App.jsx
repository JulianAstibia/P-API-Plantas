import { useState, useEffect} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import PrivateRouter from "./components/PrivateRouter"
import { useAuth } from "./context/AuthContext"

import Inicio from "./pages/Inicio"
import Favoritas from "./pages/Favoritas"
import Login from "./pages/Login"

function App() {
  const { isLogged } = useAuth()
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={ <Inicio />} />
            <Route path="/favoritas" element={
              <PrivateRouter>
                <Favoritas />
              </PrivateRouter>} />
            <Route path="/login" element={ 
              <Login />
              } />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;