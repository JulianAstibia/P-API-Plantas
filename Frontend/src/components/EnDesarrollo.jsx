import ImagenDesarrollo from "../assets/en-desarrollo2.png"

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