import { getAccessToken, getRefreshToken, setToken, clearToken } from "./tokenService"
import { API_URL, ENDPOINTS } from "../config/api"

export const apiRequest = async (endpoint, method= "GET", body = null) => {
    let access = getAccessToken()

    const makeRequest = async(token)=> {
        const isFormData = body instanceof FormData

        const headers = {
            ...(token && {Authorization: `Bearer ${token}`}),
        }
        if (!isFormData) {
            headers["Content-type"] = "application/json"
        }
        return fetch(`${API_URL}${endpoint}`,{
            method,
            headers,
            body: body 
                ? (isFormData 
                    ? body 
                    :JSON.stringify(body)) 
                : null,
        })
    }

    let response = await makeRequest(access)

    // Refresh automatico
    if (response.status === 401 && access && endpoint !== ENDPOINTS.AUTH.LOGIN){
        const refresh = getRefreshToken()

        if (!refresh){
            clearToken()
            window.location.href = "/login"
            return
        }

        const refresRes = await fetch(`${API_URL}${ENDPOINTS.AUTH.REFRESH}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ refresh })
        })

        if (!refresRes.ok){
            clearToken()
            window.location.href = "/login"
            return
        }

        const data = await refresRes.json()
        setToken(data.access, refresh)

        response = await makeRequest(data.access)
    }

    if (!response.ok){
        let data = {}
        try {
            data = await response.json()
        } catch {}

        console.log("ERROR BACKEND COMPLETO:", data)

        if (response.status === 401) throw {general: ["Email o contraseña inválida"]}
        if (response.status === 429) throw {general: ["Límite de búsqueda alcanzado. Intentá más tarde."]}
        if (response.status === 500) throw {general: ["Error interno del servidor"]}
        if (response.status === 404) throw {general: ["Recurso no encontrado"]}
        
        throw data
    }

    if (response.status === 204) return null

    return response.json()
}