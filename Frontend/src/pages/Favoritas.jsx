import { useFavoritas } from "../context/FavoritosContext"
import PlantCard from "../components/PlantCard"

const Favoritas = () => {
    const { favoritas, loading } = useFavoritas() 

    return (
        <main className="container">
            <h1 className="text-center mb-4">Plantas Favoritas</h1>

            {loading && (
                <div className="text-center mt-4">
                    <div className="spinner-border" role="status" />
                </div>
            )}

            {!loading && favoritas.length === 0 && (
                <div className="text-center mt-5">
                    <h4 className="mb-3">No tenés favoritas todavía</h4>
                    <p className="text-muted">
                        Buscá plantas y marcá la ⭐ para guardarlas acá
                    </p>
                </div>
            )}

            {!loading && favoritas.length > 0 && (
                <div className="row">
                    {favoritas.map(fav => (
                        <div
                            key={fav.id}
                            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                        >
                            <PlantCard 
                                planta={{
                                    id: fav.id_planta_api,
                                    common_name: fav.nombre_comun,
                                    scientific_name: [fav.nombre_cientifico],
                                    default_image: { medium_url: fav.imagen }
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}

export default Favoritas