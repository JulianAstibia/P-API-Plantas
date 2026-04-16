import { ENDPOINTS } from "../config/api"
import { apiRequest } from "./api"

export const buscarPlantas = async (query) => {
    const data = await apiRequest(`${ENDPOINTS.BUSCAR}?search=${query}`)
    return data.data
}