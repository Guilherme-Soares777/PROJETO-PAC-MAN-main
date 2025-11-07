

from django.urls import path
from . import views

# app_name ajuda a organizar as URLs, como o professor fez
app_name = 'game'

urlpatterns = [
    # Rota para a página principal do jogo 
    path('', views.index, name='index'),
    
    # Nova rota para a nossa API (ex: /salvar-pontuacao/)
    path('salvar-pontuacao/', views.salvar_pontuacao, name='salvar_pontuacao'),
    path('placar/', views.placar_lideres, name='placar'),
]