

// --- Funções para salvar o Score ---

// Função para pegar o cookie CSRF do Django
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

// Função para enviar o score para o backend
async function salvarScore(pontuacao) {
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
            body: JSON.stringify({ score: pontuacao })
        });
    } catch (error) {
        console.error('Erro ao salvar pontuação:', error);
    }
}

// --- Fim das funções de Score ---


// --- Código original do Jogo Pac-Man ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 16;
const cols = 28;
const rows = 31;

// ... (todo o resto do seu código original do jogo: map, player, ghost, draw, update, collides) ...
let map = [];
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
let score = 0;
const scoreEl = document.getElementById('score');
const player = { x: 14 * tileSize, y: 23 * tileSize, dir: {x:0,y:0}, speed: 2, radius: 8 };
const ghost = { x: 14 * tileSize, y: 11 * tileSize, dir: {x:0,y:0}, speed: 1.2, color: 'red' };

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
  if (Math.hypot(player.x-ghost.x, player.y-ghost.y) < 16) {
    reset();
  }
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

// ---- FUNÇÃO MODIFICADA ----
function reset() {
  salvarScore(score); // Envia o score para o backend ANTES de zerar

  // O resto da função original
  player.x = 14*tileSize; player.y = 23*tileSize; player.dir={x:0,y:0};
  ghost.x = 14*tileSize; ghost.y = 11*tileSize;
  score = 0; scoreEl.innerText = score;
  for(let y=1;y<rows-1;y++) for(let x=1;x<cols-1;x++) if(map[y][x]!==1) map[y][x]=2;
  for(let y=13;y<18;y++) for(let x=12;x<16;x++) map[y][x]=0;
}

window.addEventListener('keydown', e=>{
  if(e.key === 'ArrowUp') player.dir = {x:0,y:-1};
  if(e.key === 'ArrowDown') player.dir = {x:0,y:1};
  if(e.key === 'ArrowLeft') player.dir = {x:-1,y:0};
  if(e.key === 'ArrowRight') player.dir = {x:1,y:0};
  if(e.key.toLowerCase() === 'r') reset();
});

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
reset();
loop();