# Em game/admin.py

from django.contrib import admin
from .models import Pontuacao # Importe seu novo modelo

# Registre o modelo no site de admin
admin.site.register(Pontuacao)