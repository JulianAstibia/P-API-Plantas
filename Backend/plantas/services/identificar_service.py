import requests
from django.conf import settings

BASE_URL = settings.PLANTNET_URL

class PlantnetError(Exception):
    pass

def identificar_planta(img):
    params = {
        "api-key": settings.PLANTNET_API_KEY
    }
    carpeta = {
        "images": img
    }

    try:
        response = requests.post(
            f"{BASE_URL}/v2/identify/all",
            params=params,
            files= carpeta,
            timeout=30
        )
        
        response.raise_for_status()
        data= response.json()

    except requests.exceptions.Timeout:
        raise PlantnetError ("PlantNet tardo demasiado en responder.")
    except requests.exceptions.ConnectionError:
        raise PlantnetError ("No se pudo conectar con PlantNet")
    except requests.RequestException as e:
        raise PlantnetError (f"Error al conectar con PlantNet: {str(e)}")
    except Exception as e:
        raise (f"Error inesperado: {str(e)}")

    resultados = data.get("results", [])

    if not resultados:
        raise PlantnetError ("No se encontraron coincidencias.")

    return resultados[0]

def obtener_nombre_cientifico(img):
    resultado = identificar_planta(img)
    nombre_cientifico= resultado["species"]["scientificNameWithoutAuthor"]
    probabilidad= resultado["score"]
    nombre_comun = resultado["species"]["commonNames"]
    return nombre_comun, nombre_cientifico, probabilidad