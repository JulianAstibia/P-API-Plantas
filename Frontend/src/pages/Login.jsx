import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import FormLogin from "../components/FormLogin"

const Login = () => {
  return(
    <main className="d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6">
            <section className="bg-light rounded-5 p-4 shadow">
              <h2 className="text-center mb-4 fs-1">Login</h2>
              <FormLogin />
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login