import { createContext, useContext, useEffect, useState } from "react"
import { getFavoritas, addFavoritas, deleteFavoritas } from "../services/favoritasService"
import { useAuth } from "./AuthContext"

const FavoritasContext = createContext()

export const FavoritasProvider = ({children}) => {
    const { isLogged } = useAuth()

    const [favoritas, setFavoritas] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchFavoritas = async () => {
            try{
                setLoading(true)
                const data = await getFavoritas()
                setFavoritas(data)
            }catch(error){
                console.error("Error cargando favoritas:", error)
            }finally {
                setLoading(false)
            }
        }
        if (isLogged) fetchFavoritas()
        else{setFavoritas([])}
    }, [isLogged])

    const toggleFavoritas = async(planta) => {
        const existente = favoritas.find(f => f.id_planta_api === planta.id)

        try{
            if(existente){
                await deleteFavoritas(existente.id)
                setFavoritas(prev => prev.filter(f => f.id !== existente.id))
            }else {
                const nuevo = await addFavoritas(planta)
                setFavoritas(prev => [...prev, nuevo])
            }
        }catch(error){
            console.error("Error al cambiar favorita:", error)
            throw error
        }
    }

    const esFavorita = (plantaId) => {
        return favoritas.some(f => f.id_planta_api === plantaId)
    }

    return (
        <FavoritasContext.Provider
            value={{
                favoritas,
                loading,
                toggleFavoritas,
                esFavorita
            }}
        >
            {children}
        </FavoritasContext.Provider>
    )
}

export const useFavoritas = ()=> useContext(FavoritasContext)