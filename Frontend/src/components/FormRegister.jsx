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
    const [errors, setErrors] =useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setErrors({})

        try{
            await register(form.email, form.username, form.password, form.password2)
            alert("Usuario creado correctamente")
            navigate("/login")
        } catch (err){
            setErrors(err)
        }
    }
    return(
        <form className="text-start" onSubmit={handleSubmit}>
            <div className="my-2">
                <label className="form-label">Email</label>
                <input 
                    className={`form-control text-secondary ${errors.email ? "is-invalid" : ""}`}
                    type="email" 
                    name="email" 
                    placeholder="Ingresar email" 
                    onChange={handleChange} 
                />
                {errors.email && (
                    <div className="invalid-feedback">
                        {errors.email[0]}
                    </div>
                )}
            </div>
            <div className="my-2">
                <label className="form-label">Nombre de Usuario</label>
                <input 
                    className={`form-control text-secondary ${errors.username ? "is-invalid" : ""}`}
                    type="text"
                    name="username"
                    placeholder="Ingresar nombre de usuario" 
                    onChange={handleChange}
                />
                {errors.username && (
                    <div className="invalid-feedback">
                        {errors.username[0]}
                    </div>
                )}
            </div>
            <div className="my-2">
                <label className="form-label">Contraseña</label>
                <input 
                    className={`form-control text-secondary ${errors.password ? "is-invalid" : ""}`}
                    type="password"
                    name="password"
                    placeholder="Ingresar constraseña"
                    onChange={handleChange}
                />
                {errors.password && (
                    <div className="invalid-feedback">
                        {errors.password[0]}
                    </div>
                )}
            </div>
            <div className="my-2">
                <label className="form-label">Repetir Contraseña</label>
                <input 
                    className={`form-control text-secondary ${errors.password2 ? "is-invalid" : ""}`}
                    type="password"
                    name="password2"
                    placeholder="Repetir constraseña"
                    onChange={handleChange}
                />
                {errors.password2 && (
                    <div className="invalid-feedback">
                        {errors.password2[0]}
                    </div>
                )}
            </div>

            {errors.non_field_errors  && (
                <div className="alert alert-danger mt-3">
                    {errors.non_field_errors [0]}
                </div>
            )}
            <button className="btn btn-primary col-12 " type="submit">Registrarse</button>
        </form>
    )
}

export default FormRegister