from django.db import models

class Pontuacao(models.Model):
    """
    Representa a pontuação de um jogador no banco de dados.
    """
    nome_jogador = models.CharField(max_length=50) 
    pontos = models.IntegerField(default=0)
    data_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nome_jogador} - {self.pontos} pontos"