import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginRequest } from "../services/auth-service"

const Login = ({setIsLogged, setToken}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const data = await loginRequest(email,password)
            // guardamos el token
            localStorage.setItem("token", data.access)

            setToken(data.token)
            setIsLogged(true)

            navigate("/") //redirige
        } catch(e){
            alert(e.message)
        }
    }

    return(
        <div className="container mt-5">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                <input className="form-control mb-2" type="password" placeholder="Contraseña" onChange={(e)=>setPassword(e.target.value)} />
                <button className="btn btn-primary">Ingresar</button>
            </form>
        </div>
    )
}

export default Login