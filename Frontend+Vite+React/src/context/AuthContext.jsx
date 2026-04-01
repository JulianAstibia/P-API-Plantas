import { createContext, useContext, useState, useEffect } from "react"
import * as authService from "../services/authService"
import { getAccessToken } from "../services/tokenService"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null)

    useEffect(() => {
        const stored = getAccessToken()
        if (stored) setToken(stored)
    },[])

    const login = async (email, password) => {
        const data = await authService.login(email,password)
        setToken(data.access)
    }

    const logout = async () => {
        await authService.logout()
        setToken(null)
    }

    return (
        <AuthContext.Provider
        value={{
            token,
            isLogged: !!token,
            login,
            logout,
        }}
        >
        {children}
        </AuthContext.Provider>
    )
}

// hook limpio
export  const useAuth = () => useContext(AuthContext)