
import { ENDPOINT } from "../config.js"
import { apiRequest} from "../api.js"

// Inicialización
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("buscarBtn").addEventListener("click", buscarPlanta)
})

//Funcion Principal
async function buscarPlanta() {
    const nombre = document.getElementById("planta").value
    const contenedor = document.getElementById("resultado")

    try{
        contenedor.innerHTML = "Buscando planta ..."
        
        const data = await apiRequest(`${ENDPOINT.PLANT.BUSCAR}?q=${nombre}`)
        contenedor.innerHTML= ""

        if (!data.data || data.data.length===0){
            contenedor.innerHTML= "No se encontraron plantas"
            return
        }

        data.data.forEach(planta => {
            const div = document.createElement("div")

            div.innerHTML =`
                <h3>${planta.common_name || "Sin nombre común"}</h3>
                <p>${planta.scientific_name}</p>
                <hr>
            `
            contenedor.appendChild(div)
        })
    } catch (error){
        console.error(error)
        contenedor.innerHTML= "Error al buscar planta."
    }
}