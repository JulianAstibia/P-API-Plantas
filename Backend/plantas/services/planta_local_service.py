from django.db.models import Q
from ..models import Plantas

def buscar_planta_local(nombre):
    return Plantas.objects.filter(
        Q(nombre_comun__icontains = nombre) | Q(nombre_cientifico__icontains = nombre)
    )

def detalle_planta_local(id_planta):
    return Plantas.objects.filter(
        id_planta_perenual = id_planta
    ).first()