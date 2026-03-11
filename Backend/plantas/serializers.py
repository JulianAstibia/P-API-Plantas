from rest_framework import serializers
from .models import PlantasFavoritas, HistorialBusqueda

class PlantasFavoritasSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlantasFavoritas
        fields = "__all__"


class HistorialBusquedaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialBusqueda
        fields = "__all__"