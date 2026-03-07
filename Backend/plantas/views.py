from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import PerenualAPIError, buscar_planta

# Create your views here.
class BuscarPlantaView(APIView):

    def get(self, request):
        nombre = request.query_params.get("q")

        if not nombre:
            return Response (
                {"error": "Debes enviar ?q=nombre_planta"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            data= buscar_planta(nombre)
            return Response(data, status=status.HTTP_200_OK)
        
        except PerenualAPIError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_502_BAD_GATEWAY
            )