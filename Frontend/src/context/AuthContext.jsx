import { createContext, useContext, useState, useEffect } from "react"
import * as authService from "../services/authService"
import { clearToken, getAccessToken } from "../services/tokenService"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const stored = getAccessToken()
        if (stored) {
            setToken(stored)

            authService.getMe()
                .then((data) => setUser(data))
                .catch(() => logout())
        }
    },[])

    const loginUser = async (email, password) => {
        const data = await authService.login(email,password)
        setToken(data.access)

        const userData = await authService.getMe()
        setUser(userData)
    }

    const logout = async () => {
        try {
            await authService.logout()
        } catch (error) {
            console.warn("Error en logout:", error.message)
        } finally {
            clearToken()
            setToken(null)
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider
        value={{
            token,
            user,
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