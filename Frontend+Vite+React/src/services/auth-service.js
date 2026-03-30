export const loginRequest = async (email, password) => {
    const r = {
        "email": email,
        "password": password
    }
    
    const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(r)
    })

    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || "Error al loguearse")
    }
    return data
}