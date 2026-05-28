import { useAuth } from "../context/AuthContext"
import { useFavoritas } from "../context/FavoritosContext"
import ImagenDefault from "../assets/planta-default.png"

const PlantCard = ({planta}) => {
    const imagen = planta.default_image?.medium_url || ImagenDefault
    const nombre = planta.common_name || "Sin nombre"
    const nombre_cientifico = planta.scientific_name?.[0] || "No disponible"

    const { isLogged } = useAuth()
    const { toggleFavoritas, esFavorita } = useFavoritas()

    const isFavorita = esFavorita(planta.id)

    const handleFavorito = async() => {
        if (!isLogged){
            alert("Tenes que iniciar sesión.")
            return
        }

        try{
            await toggleFavoritas(planta)
        }catch(error){
            console.error(error)
            alert("Error al guardar como favorito.")
        }
    }

    return(
        <div className="card d-flex h-100 shadow-sm position-relative">
            <button type="button" onClick={handleFavorito} className="btn btn-secondary position-absolute top-0 end-0 rounded-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={isFavorita ? "gold" : "black"} className="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            </button>
            <img
                src={imagen}
                className="card-img-top"
                alt={nombre}
                onError={(e) => {
                    e.target.onerror = null
                    e.target.src = ImagenDefault
                }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{nombre}</h5>
                <p className="card-text mb-1">
                    <strong>Nombre Cientifico:</strong> {nombre_cientifico}
                </p>
                
                <button className="btn btn-primary mt-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                </button>
                
            </div>
        </div>
    )
}

export default PlantCard