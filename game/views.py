
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
import json
from .models import Pontuacao

# Garante que só usuários logados possam jogar
@login_required
def index(request):
    """Serve a página principal do jogo."""
    return render(request, 'game/index.html')


@login_required
@require_POST  # Só permite que esta view receba dados (via POST)
def salvar_pontuacao(request):
    """Recebe e salva a pontuação do jogador no banco de dados."""
    try:
        # Tenta ler os dados enviados pelo JavaScript
        data = json.loads(request.body)
        score_recebido = data.get('score')

        if score_recebido is not None:
            pontos = int(score_recebido) 
            
            # Cria o registro da pontuação associado ao usuário logado
            Pontuacao.objects.create(usuario=request.user, pontos=pontos)
            
            return JsonResponse({'status': 'ok'})
        else:
            # O JavaScript enviou dados, mas a chave 'score' estava faltando
            return JsonResponse({'status': 'score_nao_encontrado'}, status=400)
            
    except Exception as e:
        # Captura qualquer erro (JSON mal formatado, falha no 'int', etc.)
        return JsonResponse({'status': 'erro_servidor', 'mensagem': str(e)}, status=500)


def placar_lideres(request):
    """Busca as 10 maiores pontuações e as exibe na página do placar."""
    
    # Busca as 10 maiores pontuações, ordenadas da maior para a menor
    top_scores = Pontuacao.objects.order_by('-pontos').all()[:10]
    
    # Envia a lista de pontuações para o template HTML
    contexto = {
        'pontuacoes': top_scores
    }
    
    return render(request, 'game/placar.html', contexto)