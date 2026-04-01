export const API_URL = "http://127.0.0.1:8000"

// Con .env para produccion real
// export const API_URL = import.meta.env.VITE_API_URL;


export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/api/login/",
        LOGOUT: "/api/logout/",
        REFRESH: "/api/token/refresh/",
        ME: "/api/me/",
    },
    FAVORITAS: "/api/favoritas/",
}