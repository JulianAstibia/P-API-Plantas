from rest_framework import serializers
from .models import PlantasFavoritas, HistorialBusqueda, Plantas

class BuscarPlantasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plantas
        fields = [
            "id_planta_perenual", "nombre_comun", "nombre_cientifico", "imagen"
        ]

class PlantaDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plantas
        fields = "__all__"


class PlantasFavoritasSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlantasFavoritas
        fields = "__all__"
        read_only_fields = ["usuario"]

class IdentificarPlantasSerializer(serializers.Serializer):
    image = serializers.ImageField()

class HistorialBusquedaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialBusqueda
        fields = "__all__"
