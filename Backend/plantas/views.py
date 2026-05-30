from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import PlantasFavoritas, HistorialBusqueda
from .serializers import PlantasFavoritasSerializer, HistorialBusquedaSerializer
from .throttles import BusquedaAnonimoThrottle, BusquedaUsuarioThrottles
from .services.api_plant_service import PerenualAPIError, buscar_planta
# from .services.traduccion_service import traducir

# Create your views here.
class BuscarPlantaView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [BusquedaAnonimoThrottle, BusquedaUsuarioThrottles]


    def get(self, request):
        nombre = request.query_params.get("search") or request.query_params.get("q")

        if not nombre:
            return Response (
                {"error": "Debes enviar ?search=nombre_planta"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        
        try:
            tr_en = "en"
            tr_es = "es"
            # Traducimos al ingles 
            # nombre = traducir(nombre, tr_en)

            user = request.user if request.user.is_authenticated else None
            data= buscar_planta(nombre, user)

            #Traducimos al español
            # try:
            #     campos_a_traducir = [
            #         "common_name"
            #     ]

            #     if "data" in data:
            #         for planta in data["data"]:
            #             for campo in campos_a_traducir:
            #                 if planta.get(campo):
            #                     planta[campo] = traducir(
            #                         planta[campo],
            #                         tr_es
            #                     )

            # except Exception as e:
            #     pass

            return Response(data, status=status.HTTP_200_OK)
        
        except PerenualAPIError as e:
            print(e)
            return Response(
                {'error': str(e)},
                status=status.HTTP_502_BAD_GATEWAY
            )


class PlantasFavoritasView(ModelViewSet):
    serializer_class = PlantasFavoritasSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PlantasFavoritas.objects.filter(usuario=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class HistorialBusquedaView(ReadOnlyModelViewSet):
    serializer_class = HistorialBusquedaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return HistorialBusqueda.objects.filter(usuario=self.request.user)