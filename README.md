# 🕹️ Projeto Pac-Man com Backend Django

Este é um projeto desenvolvido para a disciplina de Frameworks Backend, conectando um jogo clássico de Pac-Man (frontend) a um backend robusto em Django/Python.

O objetivo principal era demonstrar o uso de um framework backend para criar uma aplicação web completa, incluindo persistência de dados, autenticação de usuários e uma API para comunicação entre o cliente (jogo) e o servidor.

## 🚀 Funcionalidades Implementadas

* **Banco de Dados de Pontuação:** As pontuações finais de cada partida são salvas em um banco de dados SQLite.
* **Sistema de Autenticação:** As pontuações são ligadas ao usuário que está logado no sistema.
* **API para Salvar Scores:** Uma view (`salvar_pontuacao`) funciona como um endpoint que recebe a pontuação do JavaScript (`game.js`) e a salva no banco.
* **Placar de Líderes:** Uma nova página (`/placar/`) que lê o banco de dados e exibe as 10 maiores pontuações registradas.
* **Painel de Admin:** A tabela `Pontuacao` é gerenciável através da interface de admin padrão do Django (`/admin/`).

## ⚙️ Como Rodar o Projeto (Instalação)

Para rodar este projeto na sua máquina, siga os passos abaixo no seu terminal.

*(Estas são as instruções que você mesmo escreveu, formatadas para o GitHub)*

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
    ```bash
    python manage.py migrate
    ```

6.  **Crie seu Usuário Admin:**
    ```bash
    python manage.py createsuperuser
    ```

7.  **Rode o Projeto!**
    ```bash
    python manage.py runserver
    ```

## 🎮 Como Jogar

1.  Para que o sistema saiba quem você é, primeiro acesse o painel de admin e faça login:
    `http://127.0.0.1:8000/admin/`

2.  Depois de logar, acesse a página do jogo:
    `http://127.0.0.1:8000/`

3.  Para ver o placar, acesse:
    `http://127.0.0.1:8000/placar/`
