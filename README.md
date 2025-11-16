# 🕹️ Projeto Pac-Man com Backend Django

Este é um projeto desenvolvido para a disciplina de Frameworks Backend, conectando um jogo clássico de Pac-Man (frontend) a um backend robusto em Django/Python.

O objetivo principal era demonstrar o uso de um framework backend para criar uma aplicação web completa, incluindo persistência de dados e uma API para comunicação entre o cliente (jogo) e o servidor.

## 🚀 Funcionalidades Implementadas

* **Banco de Dados de Pontuação:** As pontuações finais de cada partida são salvas em um banco de dados SQLite.
* **Sistema de Nomes de Jogador:** Em vez de um login complexo, o jogo captura o nome do jogador em um modal ao final da partida, no estilo arcade clássico. As pontuações são salvas ligadas a esse nome.
* **API para Salvar Scores:** Uma view (`salvar_pontuacao`) funciona como um endpoint que recebe o **nome** e a **pontuação** do JavaScript e os salva no banco.
* **Placar de Líderes Pop-up:** Ao fim do jogo, um modal (pop-up) aparece na tela, buscando e exibindo as 10 maiores pontuações em tempo real.
* **(Opcional) Página de Placar:** Uma página separada (`/placar/`) também lista todos os recordes.
* **(Opcional) Painel de Admin:** A tabela `Pontuacao` pode ser inspecionada (mas não é necessária para jogar) através da interface de admin padrão do Django (`/admin/`).

## ⚙️ Como Rodar o Projeto (Instalação)

Para rodar este projeto na sua máquina, siga os passos abaixo no seu terminal.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Guilherme-Soares777/PROJETO-PAC-MAN-main.git](https://github.com/Guilherme-Soares777/PROJETO-PAC-MAN-main.git)
    cd PROJETO-PAC-MAN-main
    ```

2.  **Crie o Ambiente Virtual:**
    ```bash
    py -m venv venv
    ```

3.  **Ative o Ambiente Virtual:**
    ```bash
    venv\scripts\activate.bat
    ```

4.  **Instale as Dependências:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Crie o Banco de Dados:**
    (Isso cria o `db.sqlite3` e a tabela de pontuação)
    ```bash
    python manage.py migrate
    ```

6.  **Rode o Projeto!**
    (Você não precisa mais criar um admin para jogar!)
    ```bash
    python manage.py runserver
    ```

## 🎮 Como Jogar

1.  Acesse a página do jogo:
    `http://127.0.0.1:8000/`

2.  Jogue uma partida.

3.  Ao perder, o jogo irá parar e um placar pop-up aparecerá. Digite seu nome e clique em "Salvar e Jogar" para registrar seu recorde e começar de novo!
