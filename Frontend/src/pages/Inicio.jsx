import { useState, useEffect } from "react"
import PlantCard from "../components/PlantCard.jsx"
import SearchBar from "../components/SearchBar.jsx"
import { buscarPlantas } from "../services/plantasService.js"

const Inicio = () =>{
    const [query, setQuery] = useState("")
    const [resultado, setResultado] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [busqueda, setBusqueda] = useState(false)

    const handleBuscar = async (e) => {
        e.preventDefault()

        if (!query.trim()) return

        try {
            setLoading(true)
            setError(null)
            setBusqueda(true)

            const data = await buscarPlantas(query)
            setResultado(data)

        } catch (error) {
            console.error("Error buscando plantas:", error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return(
        <main className="container ">
            <div className="d-flex justify-content-center align-items-center"> 
                <section className="row bg-light rounded-5 p-4 shadow">
                    <h2 className="text-center">Bienvenidos</h2>
                    
                    <SearchBar
                        query={query}
                        setQuery={setQuery}
                        onSearch={handleBuscar}
                        loading={loading}
                    />

                    {error && (
                        <div className="alert alert-danger text-center mt-2">
                            {error}
                        </div>
                    )}
                    
                    {!error && busqueda && resultado.length === 0 && (
                        <p className="text-center mt-2">No se encontraron resultados</p>
                    )}

                    <div className="row mt-3">
                        {resultado.map((planta) => (
                            <div 
                                key={planta.id}
                                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                            >
                                <PlantCard planta={planta} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Inicio