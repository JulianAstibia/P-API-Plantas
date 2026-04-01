import { ENDPOINTS } from "../config/api"
import { apiRequest } from "./api"
import { setToken, getRefreshToken, clearToken } from "./tokenService"


export const login = async (email, password) => {
    const res = await apiRequest(
        ENDPOINTS.AUTH.LOGIN,
        "POST",
        {email, password}
    )

    const data = await res.json()
    
    if(!res.ok){
        throw new Error("Credenciales Inválidas")
    }

    setToken(data.access, data.refresh)
    return data
}

export const logout = async () => {
    const refresh = getRefreshToken()

    if (refresh) {
        await apiRequest (
            ENDPOINTS.AUTH.LOGOUT,
            "POST",
            {refresh},
        )
    }
    clearToken()

}