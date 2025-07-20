const colors = [
  { nome: 'vermelho', valor: 'red' },
  { nome: 'azul', valor: 'blue' },
  { nome: 'verde', valor: 'green' },
  { nome: 'amarelo', valor: 'yellow' },
  { nome: 'roxo', valor: 'purple' },
  { nome: 'laranja', valor: 'orange' }
];

let targetColor = '';
let score = 0;
let time = 30;
let timer;
let playerName = '';

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const playerInput = document.getElementById('player-name');
const nameDisplay = document.getElementById('name-display');
const finalName = document.getElementById('final-name');
const finalScore = document.getElementById('final-score');
const scoreSpan = document.getElementById('score');
const timerSpan = document.getElementById('timer');
const targetSpan = document.getElementById('target-color');
const grid = document.getElementById('grid');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const rankingList = document.getElementById('ranking-list');

function generateGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const div = document.createElement('div');
    const cor = colors[Math.floor(Math.random() * colors.length)];
    div.classList.add('square');
    div.style.backgroundColor = cor.valor;
    div.setAttribute('data-color', cor.valor);
    div.addEventListener('click', handleColorClick);
    grid.appendChild(div);
  }
}

function setRandomTargetColor() {
  const sorteada = colors[Math.floor(Math.random() * colors.length)];
  targetColor = sorteada.valor;
  targetSpan.textContent = sorteada.nome;
  targetSpan.style.color = sorteada.valor;
}

function handleColorClick(event) {
  const clickedColor = event.target.getAttribute('data-color');
  if (clickedColor === targetColor) {
    score += 10;
  } else {
    score -= 5;
  }
  scoreSpan.textContent = score;
  setRandomTargetColor();
  generateGrid();
}

function startGame() {
  playerName = playerInput.value.trim();
  if (!playerName) {
    alert('Digite seu nome para jogar!');
    return;
  }

  score = 0;
  time = 30;
  scoreSpan.textContent = score;
  timerSpan.textContent = time;
  nameDisplay.textContent = playerName;

  startScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  setRandomTargetColor();
  generateGrid();

  timer = setInterval(() => {
    time--;
    timerSpan.textContent = time;
    if (time <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  gameScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');

  finalName.textContent = playerName;
  finalScore.textContent = score;

  saveToRanking(playerName, score);
  loadRanking();
}

function restartGame() {
  playerInput.value = '';
  startScreen.classList.remove('hidden');
  endScreen.classList.add('hidden');
}

function saveToRanking(name, score) {
  const data = JSON.parse(localStorage.getItem('ranking')) || [];
  data.push({ name, score });
  data.sort((a, b) => b.score - a.score);
  localStorage.setItem('ranking', JSON.stringify(data.slice(0, 5)));
}

function loadRanking() {
  const data = JSON.parse(localStorage.getItem('ranking')) || [];
  rankingList.innerHTML = '';
  data.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.name} - ${entry.score} pts`;
    rankingList.appendChild(li);
  });
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
