const PlantCard = ({ planta }) => {
    const imagen = planta.default_image?.medium_url || "https://img.freepik.com/vector-premium/icono-arbol_1076610-104626.jpg"
    const nombre = planta.common_name || "Sin nombre"
    const nombre_cientifico = planta.scientific_name?.[0] || "No disponible"

    return(
        <div className="card h-100 shadow-sm">
            <img src={imagen} className="card-img-top" alt={nombre} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{nombre}</h5>
                <p className="card-text mb-1">
                    <strong>Nombre Cientifico:</strong> {nombre_cientifico}
                </p>
                
                <button className="btn btn-primary mt-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                </button>
                
            </div>
        </div>
    )
}
/* Falta agregar funcion al boton*/
export default PlantCard