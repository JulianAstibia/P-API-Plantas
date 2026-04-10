export const API_URL = "http://127.0.0.1:8000/api"

// Con .env para produccion real
// export const API_URL = import.meta.env.VITE_API_URL;


export const ENDPOINTS = {
    AUTH: {
        REGISTER: "/register/",
        LOGIN: "/login/",
        LOGOUT: "/logout/",
        REFRESH: "/token/refresh/",
        ME: "/me/",
    },
    FAVORITAS: "/favoritas/",
    BUSCAR: "/buscar/"
}