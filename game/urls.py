# Em game/urls.py

from django.urls import path
from . import views

app_name = 'game'

urlpatterns = [
    # Rotas que já tínhamos:
    path('', views.index, name='index'),
    path('salvar-pontuacao/', views.salvar_pontuacao, name='salvar_pontuacao'),
    path('placar/', views.placar_lideres, name='placar'), # A página de placar antiga
    
    # =======================================================
    # ===== ADICIONAMOS ESTA NOVA ROTA PARA A API =====
    # =======================================================
    path('api/get-placar/', views.get_placar_json, name='get_placar_json'),
]