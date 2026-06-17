import { ENDPOINTS } from "../config/api"
import { apiRequest } from "./api"

export const buscarPlantas = async (query) => {
    const data = await apiRequest(`${ENDPOINTS.BUSCAR}?search=${query}`)
    return data.data
}

export const identificarPlanta = async (imagen) => {
    const formData = new FormData()
    formData.append("image", imagen)
    const data = await apiRequest(
        `${ENDPOINTS.IDENTIFICAR}`,
        "POST",
        formData
        )
    return data
}