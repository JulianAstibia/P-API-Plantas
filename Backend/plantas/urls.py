from django.urls import path
from .views import BuscarPlantaView


urlpatterns = [
    path('buscar/', BuscarPlantaView.as_view(), name="buscar-planta"),
    
]