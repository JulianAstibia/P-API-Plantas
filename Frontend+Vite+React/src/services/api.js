import { getAccessToken, getRefreshToken, setToken, clearToken } from "./tokenService"
import { API_URL, ENDPOINTS } from "../config/api"

export const apiRequest = async (endpoint, method= "GET", body = null) => {
    let access = getAccessToken()

    const makeRequest = async(token)=> {
        const headers = {
            "Content-Type": "application/json",
            ...(token && {Authorization: `Bearer ${token}`}),
        }
        
        return fetch(`${API_URL}${endpoint}`,{
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        })
    }

    let response = await makeRequest(access)

    // Refresh automatico
    if (response.status === 401){
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
    return response

}

