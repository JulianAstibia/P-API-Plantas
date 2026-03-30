import { useState, useEffect} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"

import Inicio from "./pages/inicio"
import Favoritas from "./pages/Favoritas"
import Login from "./pages/Login"

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(()=>{
    const savedToken = localStorage.getItem("token")

    if(savedToken){
      setToken(savedToken)
      setIsLogged(true)
    }
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
        
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={ <Inicio />} />
            <Route path="/favoritas" element={ <Favoritas />} />
            <Route path="/login" element={ 
              <Login setIsLogged={setIsLogged} setToken={setToken} />
              } />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;