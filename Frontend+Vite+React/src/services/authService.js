import { use } from "react"
import { ENDPOINTS } from "../config/api"
import { apiRequest } from "./api"
import { setToken, getRefreshToken, clearToken } from "./tokenService"


export const login = async (email, password) => {
    const data = await apiRequest(
        ENDPOINTS.AUTH.LOGIN,
        "POST",
        {email, password}
    )

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

export const register = async (email, username, password, password2) => {
    const data = await apiRequest(
        ENDPOINTS.AUTH.REGISTER,
        "POST",
        {email, username, password, password2}
    )
    return data
}