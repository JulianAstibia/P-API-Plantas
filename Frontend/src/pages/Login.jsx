import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { loginUser } = useAuth()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const data = await loginUser(email, password)

            navigate("/") //redirige
        } catch(e){
            alert(e.message)
        }
    }

    return(
        
    <main className="d-flex justify-content-center align-items-center">

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6">

            <section className="bg-light rounded-5 p-4 shadow">

              <h2 className="text-center mb-4 fs-1">Login</h2>

              <form className="fs-4" onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control fs-6"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control fs-6"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary w-100 mt-2 fs-4">
                  Iniciar Sesión
                </button>

                <div className="mt-3 d-flex justify-content-between">
                  <Link to="/register" className="btn btn-secondary btn-sm fs-6">
                    Registrarse
                  </Link>

                  <Link to="/forgot" className="btn btn-link btn-sm fs-6">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
        
    )
}

export default Login