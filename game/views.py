from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json
from .models import Pontuacao

def index(request):
    """Serve a página principal do jogo (index.html)."""
    return render(request, 'game/index.html')

@require_POST
def salvar_pontuacao(request):
    """
    Recebe um NOME e um SCORE (via JSON) do JavaScript 
    e os salva no banco de dados.
    """
    try:
        data = json.loads(request.body)
        score_recebido = data.get('score')
        nome_recebido = data.get('nome') 

        if score_recebido is not None and nome_recebido:
            pontos = int(score_recebido)
            nome = str(nome_recebido).strip()[:50] 
            
            if not nome: # Garante que o nome não seja vazio
                nome = "JOGADOR 1"
            
            Pontuacao.objects.create(nome_jogador=nome, pontos=pontos)
            return JsonResponse({'status': 'ok'})
        else:
            return JsonResponse({'status': 'dados_incompletos'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'erro_servidor', 'mensagem': str(e)}, status=500)

def placar_lideres(request):
    """
    Busca as 10 maiores pontuações e as exibe na página
    de placar separada (/placar/).
    """
    top_scores = Pontuacao.objects.order_by('-pontos').all()[:10]
    contexto = { 'pontuacoes': top_scores }
    return render(request, 'game/placar.html', contexto)

def get_placar_json(request):
    """
    Busca as 10 maiores pontuações e as retorna como dados JSON
    para o modal (pop-up) do jogo.
    """
    top_scores = Pontuacao.objects.order_by('-pontos').all()[:10]
    
    # Transforma os dados do banco em uma lista que o JSON entende
    data = [
        {"usuario": s.nome_jogador, "pontos": s.pontos}
        for s in top_scores
    ]
    
    return JsonResponse(data, safe=False)