import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services/authService"

const FormRegister = () =>{
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        password2: ""
    })
    const [error, setError] =useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError(null)

        try{
            await register(form.email, form.username, form.password, form.password2)
            alert("Usuario creado correctamente")
            navigate("/login")
        } catch (err){
            setError("Error al registrarse")
        }
    }
    return(
        <form className="text-start" onSubmit={handleSubmit}>
            <div className="my-2">
                <label className="form-label ">Email</label>
                <input 
                    className="form-control"
                    type="email" 
                    name="email" 
                    placeholder="Ingresar email" 
                    onChange={handleChange} 
                />
            </div>
            <div className="my-2">
                <label className="form-label ">Nombre de Usuario</label>
                <input 
                    className="form-control"
                    type="text"
                    name="username"
                    placeholder="Ingresar nombre de usuario" 
                    onChange={handleChange}
                />
            </div>
            <div className="my-2">
                <label className="form-label ">Contraseña</label>
                <input 
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Ingresar constraseña"
                    onChange={handleChange}
                />
            </div>
            <div className="my-2">
                <label className="form-label ">Repetir Contraseña</label>
                <input 
                    className="form-control"
                    type="password"
                    name="password2"
                    placeholder="Repetir constraseña"
                    onChange={handleChange}
                />
            </div>
            <button className="btn btn-primary col-12 " type="submit">Registrarse</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default FormRegister