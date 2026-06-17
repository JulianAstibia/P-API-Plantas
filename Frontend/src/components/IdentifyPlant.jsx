import { useState } from "react"

const IdentificarPlanta = ({ imagen, setImagen, onIdentificar, loading}) => {
    const[isDragging, setIsDragging] = useState(false)
    const[preview, setPreview] = useState(null)

    const handlerDragOver = (e) =>{
        e.preventDefault()
        setIsDragging(true)
    }
    const handlerDragLeave = () => {
        setIsDragging(false)
    }
    const handlerDrop = (e) =>{
        e.preventDefault()
        setIsDragging(false)

        const file = e.dataTransfer.files[0]
        if (!file.type.startsWith("image/")) return
        setImagen(file)
        setPreview(URL.createObjectURL(file))
    }

    return(
        <>
            <h3>Busqueda por Imagen</h3>     
            <div className="d-flex gap-2">   
                <div
                    onDragOver={handlerDragOver}
                    onDragLeave={handlerDragLeave}
                    onDrop={handlerDrop} 
                    className={`d-flex justify-content-center align-items-center border border-2 flex-grow-1 text-center mx-auto ${isDragging ? "bg-secondary" : ""}`}
                    style={{
                        cursor: "pointer",
                        height: "250px",
                        borderRadius: "10px"
                        }}>
                    {preview ? (
                        <img 
                            src={preview} 
                            alt="Vista previa" 
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                borderRadius: "10px"
                                }}/>
                        ): <div>
                            <p>Arrastra una imagen</p>
                            <p>o click aqui</p>
                        </div>
                    }
                </div>
                <button 
                    className="btn btn-success col-2 my-auto"
                    disabled= {loading || !imagen}
                    onClick={onIdentificar}
                    >{loading ? "..." : "Identificar"}
                </button>
            </div>
        </>
    )
}

export default IdentificarPlanta