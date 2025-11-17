# **Projeto PAC-MAN – Documentação Oficial**

**UNINASSAU – Ciência da Computação**  
**Disciplina:** Backend Framework  
**Professor:** Maurício Braga  
**Ano:** 2025  

---

## **Autores**
- Assuero Eduardo Cândido Guimarães – 01698585  
- Giovanni Saverio Svedese Rocha – 01725339  
- Guilherme Soares de Araújo Rocha – 01718731  
- Maria Clara Peixoto de Sousa – 01714429  
- Matheus Rodrigues de Souza – 01702755  
- Thaysa Maria Cordeiro Santiago – 01701779  

---

# 📘 **Resumo**

Este documento descreve o projeto PAC-MAN, desenvolvido como atividade da disciplina Backend Framework.  
A aplicação utiliza **Django** como estrutura principal e incorpora uma implementação do jogo PAC-MAN baseada em HTML, CSS e JavaScript.

O objetivo é integrar um jogo web real dentro de uma arquitetura de backend moderna, reforçando conceitos de rotas, templates, organização de projeto e boas práticas.

**Palavras-chave:** PAC-MAN, Django, Backend Framework, HTML, CSS, JavaScript.

---

# 📖 **Sumário**

1. Introdução  
2. Objetivos  
3. Escopo  
4. Tecnologias Utilizadas  
5. Estrutura do Projeto  
6. Planejamento (IPECC)  
7. Implementação  
8. Testes  
9. Conclusão  
10. Referências  

---

# 1. **Introdução**

O projeto PAC-MAN foi desenvolvido com o intuito de aplicar conceitos fundamentais de desenvolvimento backend utilizando Django, além de explorar a integração entre backend e conteúdos estáticos avançados (jogos, scripts e assets).

A aplicação permite a execução do jogo PAC-MAN diretamente pelo navegador, servindo como estudo de rotas, templates, estáticos e organização modular de aplicações web.

---

# 2. **Objetivos do Projeto**

## 🎯 **Objetivo Geral**
Desenvolver uma aplicação Django contendo uma implementação funcional do jogo PAC-MAN.

## 🎯 **Objetivos Específicos**
- Integrar HTML/CSS/JS ao backend via Django.  
- Organizar o projeto em módulos seguindo boas práticas.  
- Implementar uma rota para carregar o jogo no navegador.  
- Estruturar código e documentação conforme padrões acadêmicos.  
- Utilizar versionamento com Git e GitHub.

---

# 3. **Escopo**

### ✔ Inclui:
- Aplicação Django completa  
- Rota e template para o jogo  
- Jogo funcional em JavaScript  
- Estruturação de assets (imagens, CSS, JS)  
- Documentação técnica do sistema  

### ✘ Não inclui:
- Inteligência artificial dos fantasmas  
- Painel administrativo personalizado  
- Sistema de login  
- Banco de dados com pontuações

---

# 4. **Tecnologias Utilizadas**

| Tecnologia | Função |
|-----------|--------|
| **Django 5** | Backend e estrutura do projeto |
| **Python** | Lógica e gerenciamento do framework |
| **HTML5** | Estrutura visual do jogo |
| **CSS3** | Estilização |
| **JavaScript** | Movimentação do PAC-MAN, colisões e loop do jogo |
| **Git / GitHub** | Versionamento |
| **VS Code** | Editor de desenvolvimento |

---

# 5. **Estrutura do Projeto (analisada diretamente do ZIP)**



PROJETO-PAC-MAN-main-main/
│
├── manage.py
├── requirements.txt
│
├── myproject/ ← Pasta principal do Django
│ ├── settings.py
│ ├── urls.py
│ └── ...
│
├── game/ ← App Django onde o PAC-MAN é carregado
│ ├── static/game/
│ │ ├── script.js ← Lógica do jogo
│ │ ├── style.css ← Estilos do jogo
│ │ └── assets/ ← Imagens
│ ├── templates/game/
│ │ └── index.html ← Template do jogo
│ └── views.py ← Carrega tela do PAC-MAN
│
└── PROJETO-PAC-MAN-main/ ← Versão antiga do jogo (HTML/CSS/JS)


### 📄 **Arquivos principais**
- **index.html:** estrutura do jogo  
- **style.css:** visual e layout  
- **script.js:** movimentação, colisões e loop  
- **urls.py:** rota que exibe o jogo no navegador  
- **views.py:** lógica da página principal  

---

# 6. **Planejamento — IPECC**

## 6.1 — Iniciação
- Escolha do tema: PAC-MAN  
- Objetivo: integrar frontend e backend  
- Aprovação do professor Maurício Braga  

## 6.2 — Planejamento
- Definição de cronograma em equipe  
- Seleção das tecnologias  
- Estimativa de riscos (falhas de colisão, bugs de renderização)  

## 6.3 — Execução
- Estruturação do Django  
- Implementação do jogo  
- Criação da rota `/game/`  
- Testes de gameplay  
- Versionamento contínuo  

## 6.4 — Monitoramento e Controle
- Testes de movimentação  
- Ajustes de velocidade  
- Correção de limites e colisões  
- Revisão dos arquivos estáticos  

## 6.5 — Encerramento
- Limpeza da estrutura  
- Finalização do README  
- Entrega no GitHub  

---

# 7. **Implementação**

O jogo funciona através de um loop contínuo que:

1. Lê as teclas pressionadas  
2. Calcula a posição do PAC-MAN  
3. Verifica colisões no mapa  
4. Atualiza visualmente o jogador  

### 🧩 Exemplo simplificado:

```js
window.addEventListener("keydown", (e) => {
    calcularMovimento(e.key);
});

function calcularMovimento(tecla) {
    let novaPos = calcularPosicao(tecla);

    if (!colide(novaPos)) {
        pacman.posicao = novaPos;
        renderizar();
    }
}

8. Testes e Monitoramento
Navegadores testados:

Chrome

Edge

Firefox

Casos de teste:

✔ Movimentação correta
✔ Colisão funcionando
✔ Renderização estável
✔ Compatibilidade de tela

Correções aplicadas:

Ajustes de velocidade

Limites laterais

Falhas de colisão rápida

9. Conclusão

O projeto PAC-MAN atingiu com sucesso seus objetivos pedagógicos, demonstrando domínio em:

Estruturação de projeto Django

Integração de conteúdo estático dentro do backend

Manipulação de DOM com JavaScript

Organização modular do código

🔧 Possíveis melhorias

IA dos fantasmas

Sistema de pontuação

Banco de dados

Telas adicionais

Sons e animações

10. Referências

MDN Web Docs – JavaScript

Django Project Documentation

Torres, 2020 – Desenvolvimento de Jogos Web

Repositório do GitHub do projeto