import { Link, useNavigate } from "react-router-dom"

const Navbar = ({isLogged, setIsLogged}) => {
  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Plantitas
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/"} >
                Inicio
              </Link>
            </li>
            { isLogged && (
                <li className="nav-item">
                  <Link className="nav-link" to={"/favoritas"}>
                    Plantas favoritas
                  </Link>
                </li>
            )}
            { isLogged && (
                <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Historial</a>
                </li>
            )}
            { isLogged && (
                <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Ajustes</a>
                </li>
            )}
            { !isLogged && (
                <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Registrarse</a>
                </li>
            )}
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Buscar planta" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>
          { isLogged ? (
            <button className="btn btn-outline-danger mx-2" onClick={()=> {
              localStorage.removeItem("token")
              setIsLogged(false)
              navigate("/")}
              }>Cerrar Sección</button>
          ) : (
            <Link className="btn btn-outline-primary mx-2" to="/login">Iniciar Sección</Link>
          )}
        </div>
      </div>
    </nav>
    )
}

export default Navbar