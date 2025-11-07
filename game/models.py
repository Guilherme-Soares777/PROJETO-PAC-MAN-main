

from django.db import models
# Importa o modelo de Usuário padrão do Django, que cuida do login
from django.contrib.auth.models import User 

# Esta é a definição da sua tabela no banco de dados
class Pontuacao(models.Model):
    # Cria um link para o usuário que fez a pontuação.
    # Se o usuário for deletado, todas as suas pontuações também serão.
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # Um campo para guardar o número de pontos
    pontos = models.IntegerField(default=0)
    
    # Um campo de data que salva automaticamente quando o registro foi criado
    data_registro = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return f"{self.usuario.username} - {self.pontos} pontos"