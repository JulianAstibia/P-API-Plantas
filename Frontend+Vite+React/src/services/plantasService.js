import { ENDPOINTS } from "../config/api"
import { apiRequest } from "./api"

export const buscarPlantas = async (query) => {
    const response = await apiRequest(`${ENDPOINTS.BUSCAR}?search=${query}`)
    const data = await response.json()
    return data.data
}