from django.conf import settings
import requests

EN_PRODUCCION = settings.LIBRETRANSLATE_URL
EN_DESARROLLO = "http://localhost:5000"

BASE_URL = EN_PRODUCCION
    
class LibreTranslateAPIError(Exception):
    pass

def traducir(text, target):
    url = f'{BASE_URL}/translate'
    params = {
        "q" : text,
        "source" : "auto",
        "target" : target,
        "format" :"text"
    }

    try:
        response = requests.post(
            url, 
            json= params,
            # headers={
            #     "Content-Type": "application/json"
            # }, NO ES NECESARIO AGREGAR HEADERS - REQUESTS LO AGREGA DE FORMA AUTOMATICA   
            timeout=15
        )
        response.raise_for_status()
        data= response.json()

        translatedText = data.get("translatedText")

        if not translatedText:
            raise LibreTranslateAPIError("LibreTranslate no devolvió translatedText")
        
        return translatedText

    except requests.exceptions.Timeout:
        raise LibreTranslateAPIError("La API externa de LibreTranslate tardó demasiado en responder")
    
    except requests.exceptions.ConnectionError:
        raise LibreTranslateAPIError("No se pudo conectar con LibreTranslate")
    
    except requests.exceptions.RequestException as e:
        raise LibreTranslateAPIError(f"Error al conectar con LibreTranslate: {str(e)}")
    