import requests
from django.conf import settings
from ..models import HistorialBusqueda, Plantas
from .traduccion_service import traducir
from .planta_local_service import buscar_planta_local, detalle_planta_local


BASE_URL = settings.PENENUAL_URL

class PerenualAPIError(Exception):
    pass

def guardar_busqueda_planta(data):
    for planta in data.get("data", []):
            default_image = planta.get("default_image")
            scientific_names = planta.get("scientific_name", [])

            Plantas.objects.update_or_create(
                id_planta_perenual = planta["id"],
                defaults={
                    "nombre_comun": planta.get("common_name"),
                    "nombre_cientifico": scientific_names[0] if scientific_names else "",
                    "imagen": default_image.get("regular_url") if default_image else ""
                }
            )

def buscar_planta(nombre,user=None):
    tr_en = "en"
    nombre = nombre.strip().lower()
    nombre_ingles = traducir(nombre,tr_en)

    # plantas_locales = buscar_planta_local(nombre_ingles)
    # if plantas_locales.exists():
    #     resultado = []
    #     for planta in plantas_locales:
    #         resultado.append({
    #             "id": planta.id_planta_perenual,
    #             "common_name": planta.nombre_comun,
    #             "scientific_name": planta.nombre_cientifico,
    #             "default_image": {
    #                 "regular_url": planta.imagen
    #             } if planta.imagen else None}
    #         )

    #     return {"data": resultado}
    
    data = buscar_planta_api(nombre_ingles)
    # guardar_busqueda_planta(data)

    try:
        if user and user.is_authenticated:
            HistorialBusqueda.objects.update_or_create(
                usuario=user,
                query=nombre,
                defaults={}  # por si quisiera actualizar algun campo más adelante
            )
    except Exception:
        pass
    return data

def buscar_planta_api(nombre):
    url = f'{BASE_URL}/species-list'
    params = {
        "key": settings.PERENUAL_API_KEY,
        "q": nombre
    }

    try:
        response = requests.get(url, params=params, timeout=20)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.Timeout:
        raise PerenualAPIError("PerenualAPI tardó demasiado en responder")
    
    except requests.exceptions.ConnectionError:
        raise PerenualAPIError("No se pudo conectar con PerenualAPI")
    
    except requests.exceptions.RequestException as e:
        raise PerenualAPIError(f"Error al conectar con PerenualAPI: {str(e)}")
    
def guardar_detalle_planta(data):
    Plantas.objects.update_or_create(

    )

def detalle_planta_api(id_planta):
    url= f'{BASE_URL}/species/details/{id_planta}'
    params = {
        "key": settings.PERENUAL_API_KEY
    }

    try:
        response = requests.get(url, params=params, timeout=20)
        response.raise_for_status()
        return response.json()
    
    except requests.exceptions.Timeout:
        raise PerenualAPIError("PerenualAPI tardó demasiado en responder")
    except requests.exceptions.ConnectionError:
        raise PerenualAPIError("No se pudo conectar con PerenualAPI")
    except requests.exceptions.RequestException as e:
        raise PerenualAPIError(f"Error al conectar con PerenualAPI: {str(e)}")
    except requests.exceptions.HTTPError as e:
        raise PerenualAPIError(
        f"Status: {response.status_code} | Body: {response.text}"
        )
    

