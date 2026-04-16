import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import PrivateRouter from "./components/PrivateRouter"

import Inicio from "./pages/Inicio"
import Favoritas from "./pages/Favoritas"
import Login from "./pages/Login"
import Registrarse from "./pages/Registrarse"

function App() {
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
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Registrarse />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;