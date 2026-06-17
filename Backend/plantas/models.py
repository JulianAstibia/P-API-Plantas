from django.db import models
from django.conf import settings

# Class Meta se usa para:
#   Configurar cómo se comporta el modelo en la base de datos y en Django.
#   No para guardar datos.

# Create your models here.
class Plantas(models.Model):
    id_planta_perenual = models.PositiveIntegerField(unique=True)
    nombre_comun = models.CharField(max_length=250)
    nombre_cientifico = models.CharField(max_length=250)
    tipo = models.CharField(max_length=150, blank=True, null=True)
    ciclo = models.CharField(max_length=150, blank=True, null=True)
    riego = models.CharField(max_length=150, blank=True, null=True)
    luz = models.CharField(max_length=150, blank=True, null=True)
    crecimiento = models.CharField(max_length=150, blank=True, null=True)
    mantenimiento = models.CharField(max_length=150, blank=True, null=True)
    venenosa_humano = models.BooleanField(null=True)
    venenosa_mascota = models.BooleanField(null=True)
    imagen = models.URLField(max_length=1000, blank=True)
    datos_api = models.JSONField(default=dict)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    datos_completos = models.BooleanField(default=False)

    class Meta:
        ordering = ["nombre_cientifico"]

class PlantasFavoritas(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="plantas_favoritas")
    id_planta_api = models.PositiveIntegerField()
    nombre_comun = models.CharField(max_length=250)
    nombre_cientifico = models.CharField(max_length=250)
    imagen = models.URLField(max_length=1000, blank=True)

    agregado = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-agregado"]
        unique_together = ("usuario", "id_planta_api")

    def __str__(self):
        return f"{self.nombre_comun} - {self.usuario}"
    

class Traducciones(models.Model):
    texto_original = models.CharField(max_length=500)
    idioma_objetivo = models.CharField(max_length=10)
    traduccion = models.CharField(max_length=500)

    class Meta:
        unique_together = (
            "texto_original",
            "idioma_objetivo"
        )

class HistorialBusqueda(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="historial_busqueda")
    query = models.CharField(max_length=200)
    fecha = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-fecha"]
        unique_together = ("usuario", "query")

    def __str__(self):
        return f"{self.query} - {self.usuario}"