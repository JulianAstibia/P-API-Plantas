import ImagenDesarrollo from "../assets/ed.png"

const EnDesarrollo = () => {
    return(
        <div className="d-flex justify-content-center align-items-center">
            <img 
                src={ImagenDesarrollo} 
                alt="Sección en Desarrollo" 
                className="img-fluid rounded-5 shadow"
                style={{ maxHeight: "75vh" }}
            />
        </div>
    )
}

export default EnDesarrollo