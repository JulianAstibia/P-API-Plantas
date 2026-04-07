const PlantCard = ({ planta }) => {
    const imagen = planta.default_image?.medium_url || "https://via.placeholder.com/300"
    const nombre = planta.common_name || "Sin nombre"
    const nombre_cientifico = planta.scientific_name?.[0] || "No disponible"
    const luz = planta.sunlight?.[0] || "No especificado"
    const riego = planta.watering || "No especificado"

    return(
        <div className="card h-100 shadow-sm">
            <img src={imagen} className="card-img-top" alt={nombre} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{nombre}</h5>
                <p className="card-text mb-1">
                    <strong>Nombre Cientifico:</strong> {nombre_cientifico}
                </p>
                <p className="card-text">
                    <strong>Luz:</strong> {luz}
                </p>
                <p className="card-text">
                    <strong>Riego:</strong> {riego}
                </p>

            </div>
        </div>
    )
}

export default PlantCard