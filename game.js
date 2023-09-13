import { addFood, draw as drawFood, restartFood, update as updateFood } from './food.js';
import { restartInput } from './input.js';
import {
  draw as drawSnake,
  getSnakeHead,
  restartSnake,
  SNAKE_SPEED,
  snakeIntersection,
  update as updateSnake,
} from './snake.js';

export const GRID_SIZE_X = 25;
export const GRID_SIZE_Y = 20;
export let gameOver = false;

let lastRenderTime = 0;
const gameBoard = document.getElementById("gameBoard");
let gameWon = new Audio('/assests/snake_audio/game_over_win.wav');
let gameLost = new Audio('/assests/snake_audio/game_over_lose.wav');
//game frame loop
function main(currentTime) {
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (gameOver) {
    return;
  }
  //requesting browser to rerender frame
  window.requestAnimationFrame(main);

  //if there hasn't past enough time, we dont update the lastRenderTime
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;
  update();
  draw();
}

window.requestAnimationFrame(main);

//updates game params, ex snake position, length, food position
function update() {
  checkDeath();
  updateFood();
  updateSnake();  
}

//draws the game items after updating their positions
function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
  if (gameOver) gameOverDisplay(0);
}

function outsideGrid(position) {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE_X ||
    position.y < 1 ||
    position.y > GRID_SIZE_Y
  );
}

export function startGame() {
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
  document.getElementById("buttonWrapper").classList.remove("startGame");
  document.getElementById("buttonWrapper").classList.add("resetGame");
}

export function restartGame() {
  setGameOver(false);
  lastRenderTime = 0;

  restartFood();

  restartSnake();

  restartInput();
  main();
  document.getElementById('gameOverState').classList.add('hide');
  document.getElementById('gameWonState').classList.add('hide');
  document.getElementById("buttonWrapper").classList.remove("resetGame");
  document.getElementById("buttonWrapper").classList.add("startGame");
  //startGame();
}

export function gameOverDisplay(won) {
  if (won) {
    gameWon.play();
    document.getElementById("gameWonState").classList.remove("hide");
  } else {
    gameLost.play();
    document.getElementById("gameOverState").classList.remove("hide");
  }
  // to stop rendering
  setGameOver(true);
}

export function setGameOver(flag) {
  gameOver = flag;
}

document
  .getElementById("startGameButton")
  .addEventListener("click", () => startGame());

document.getElementById("restartGameButton").addEventListener("click", function () {
  restartGame();
});

document.getElementById("arrowUp").addEventListener("click", function(){
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
})

document.getElementById("arrowDown").addEventListener("click", function(){
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
})

document.getElementById("arrowLeft").addEventListener("click", function(){
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
})

document.getElementById("arrowRight").addEventListener("click", function(){
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
})

document.getElementById("plusButton").addEventListener("click", function(){
  addFood(1);
})

document.getElementById("minusButton").addEventListener("click", function(){
  addFood(-1);
})