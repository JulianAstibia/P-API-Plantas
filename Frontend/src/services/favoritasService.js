import { ENDPOINTS } from "../config/api"
import { apiRequest } from "./api"

export const getFavoritas = async() => {
    const data = await apiRequest(
        ENDPOINTS.FAVORITAS,
        "GET"
    )
    return data
}

export const addFavoritas = async(planta) => {
    const data = await apiRequest(
        ENDPOINTS.FAVORITAS,
        "POST",
        {
            id_planta_api: planta.id,
            nombre_comun: planta.common_name,
            nombre_cientifico: planta.scientific_name?.[0],
            imagen: planta.default_image?.medium_url
        }
    )
    return data
}

export const deleteFavoritas = async(id) => {
    const data = await apiRequest(
        `${ENDPOINTS.FAVORITAS}${id}/`,
        "DELETE"
    )
    return data
}