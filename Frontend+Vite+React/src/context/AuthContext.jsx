import { createContext, useContext, useState, useEffect } from "react"
import * as authService from "../services/authService"
import { clearToken, getAccessToken } from "../services/tokenService"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null)

    useEffect(() => {
        const stored = getAccessToken()
        if (stored) setToken(stored)
    },[])

    const loginUser = async (email, password) => {
        const data = await authService.login(email,password)
        setToken(data.access)
    }

    const logout = async () => {
        try {
            await authService.logout()
        } catch (error) {
            console.warn("Error en logout:", error.message)
        } finally {
            clearToken()
            setToken(null)
        }
    }

    return (
        <AuthContext.Provider
        value={{
            token,
            isLogged: !!token,
            loginUser,
            logout,
        }}
        >
        {children}
        </AuthContext.Provider>
    )
}

// hook limpio
export  const useAuth = () => useContext(AuthContext)