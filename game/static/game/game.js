// --- Funções de Comunicação com o Backend ---

/**
 * Pega o cookie de segurança (CSRF) do Django.
 */
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
 * Envia o nome e a pontuação para a API do Django.
 */
async function salvarScore(nome, pontuacao) {
    if (pontuacao <= 0) {
        return; // Não salva pontuação 0
    }
    const csrftoken = getCookie('csrftoken');
    try {
        await fetch('/salvar-pontuacao/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ score: pontuacao, nome: nome }) 
        });
    } catch (error) {
        console.error('Erro ao salvar pontuação:', error);
    }
}

// --- Variáveis Globais do Jogo ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const placarModal = document.getElementById('placar-modal');
const placarLista = document.getElementById('placar-lista');
const btnRestart = document.getElementById('btn-restart');
const nomeJogadorInput = document.getElementById('nomeJogadorInput');

const tileSize = 16;
const cols = 28;
const rows = 31;

let map = [];
let score = 0;
let player = {};
let ghost = {};
let animationId = null; // Usado para parar o loop do jogo

// --- Funções Principais do Jogo (Draw, Collide, Update, Loop) ---
// (Estas funções são a lógica pura do jogo Pac-Man)

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let v = map[y][x];
      let px = x*tileSize, py = y*tileSize;
      if (v === 1) {
        ctx.fillStyle = '#0b3';
        ctx.fillRect(px,py,tileSize,tileSize);
      } else if (v === 2) {
        ctx.fillStyle = '#ffd';
        ctx.beginPath();
        ctx.arc(px+tileSize/2, py+tileSize/2, 3, 0, Math.PI*2);
        ctx.fill();
      }
    }
  }
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(player.x+tileSize/2, player.y+tileSize/2, player.radius, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = ghost.color;
  ctx.beginPath();
  ctx.arc(ghost.x+tileSize/2, ghost.y+tileSize/2, 10, 0, Math.PI*2);
  ctx.fill();
}

function collides(px, py) {
  let corners = [
    [px, py],
    [px+tileSize-1, py],
    [px, py+tileSize-1],
    [px+tileSize-1, py+tileSize-1]
  ];
  for (let c of corners) {
    let mx = Math.floor(c[0]/tileSize);
    let my = Math.floor(c[1]/tileSize);
    if (map[my] && map[my][mx] === 1) return true;
  }
  return false;
}

function update() {
  let nx = player.x + player.dir.x * player.speed;
  let ny = player.y + player.dir.y * player.speed;
  if (!collides(nx, player.y)) player.x = nx;
  if (!collides(player.x, ny)) player.y = ny;

  let gx = Math.floor((player.x+tileSize/2)/tileSize);
  let gy = Math.floor((player.y+tileSize/2)/tileSize);
  if (map[gy] && map[gy][gx] === 2) {
    map[gy][gx] = 0;
    score += 10;
    scoreEl.innerText = score;
  }

  let dx = player.x - ghost.x;
  let dy = player.y - ghost.y;
  let len = Math.hypot(dx,dy);
  if (len > 0) {
    ghost.dir.x = dx/len; ghost.dir.y = dy/len;
    let ngx = ghost.x + ghost.dir.x * ghost.speed;
    let ngy = ghost.y + ghost.dir.y * ghost.speed;
    if (!collides(ngx, ghost.y)) ghost.x = ngx;
    if (!collides(ghost.x, ngy)) ghost.y = ngy;
  }

  // Se colidir, chama a função de Fim de Jogo
  if (Math.hypot(player.x-ghost.x, player.y-ghost.y) < 16) {
    endGame();
  }
}

function loop() {
  animationId = requestAnimationFrame(loop); // Salva o ID para podermos parar
  update();
  draw();
}

// --- Funções de Lógica do Jogo (Setup, End, Restart) ---

/**
 * Configura (ou reseta) o estado inicial do jogo.
 */
function setupGame() {
  map = [];
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      if (x === 0 || y === 0 || x === cols - 1 || y === rows - 1) row.push(1);
      else row.push(2);
    }
    map.push(row);
  }
  for (let y = 13; y < 18; y++) {
    for (let x = 12; x < 16; x++) map[y][x] = 0;
  }
  
  player = { x: 14 * tileSize, y: 23 * tileSize, dir: {x:0,y:0}, speed: 2, radius: 8 };
  ghost = { x: 14 * tileSize, y: 11 * tileSize, dir: {x:0,y:0}, speed: 1.2, color: 'red' };
  score = 0; 
  scoreEl.innerText = score;
}

/**
 * Chamada quando o jogador perde. Para o jogo e mostra o placar.
 */
async function endGame() {
  cancelAnimationFrame(animationId); // Para o loop do jogo
  
  // Busca os scores no backend (API)
  const response = await fetch('/api/get-placar/');
  const scores = await response.json();
  
  // Preenche a lista de placar no modal
  placarLista.innerHTML = '';
  if (scores.length > 0) {
    scores.forEach(s => {
      // s.usuario vem da nossa API (o nome_jogador)
      placarLista.innerHTML += `<li><strong>${s.usuario}</strong> - ${s.pontos} pontos</li>`;
    });
  } else {
    placarLista.innerHTML = '<p style="color: #aaa; font-size: 0.8em;">Seja o primeiro a pontuar!</p>';
  }
  
  // Mostra o modal (pop-up)
  placarModal.classList.remove('hidden');
}

/**
 * Chamada pelo botão "Salvar e Jogar". Salva o score e reinicia o jogo.
 */
async function restartGame() {
  placarModal.classList.add('hidden'); // Esconde o modal
  
  let nome = nomeJogadorInput.value.trim();
  if (nome === "") {
      nome = "JOGADOR 1";
  }
  
  // 1. Envia o nome e o score para o Django
  await salvarScore(nome, score); 
  
  // 2. Reseta e começa o jogo de novo
  setupGame(); 
  loop(); 
}

// --- Inicialização do Jogo ---

// Diz ao botão o que fazer quando clicado
btnRestart.addEventListener('click', restartGame);

// Configura e inicia o jogo pela primeira vez
setupGame();
loop();

// Controla o Pac-Man
window.addEventListener('keydown', e=>{
  if(e.key === 'ArrowUp') player.dir = {x:0,y:-1};
  if(e.key === 'ArrowDown') player.dir = {x:0,y:1};
  if(e.key === 'ArrowLeft') player.dir = {x:-1,y:0};
  if(e.key === 'ArrowRight') player.dir = {x:1,y:0};
});