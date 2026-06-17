from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BuscarPlantaView, PlantasFavoritasView, HistorialBusquedaView, IdentificarPlantaView, DetallesPlantaView

router = DefaultRouter()
router.register(r'plantas-favoritas', PlantasFavoritasView, basename="plantas-favoritas")
router.register(r'historial', HistorialBusquedaView, basename="historial")

urlpatterns = [
    path('buscar/', BuscarPlantaView.as_view(), name="buscar-planta"),
    path('detalle-planta/<int:id_planta>/', DetallesPlantaView.as_view(), name="detalle-planta"),
    path('identificar-planta/', IdentificarPlantaView.as_view(), name="identificar-planta"),
    path('', include(router.urls)),
   
]