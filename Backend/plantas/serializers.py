from rest_framework import serializers
from .models import PlantasFavoritas

class PlantasFavoritasSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlantasFavoritas
        field = "__all__"
        