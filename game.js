import {
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
  SNAKE_SPEED,
  snakeBody,
  restartSnake,
} from "./snake.js";
import {
  update as updateFood,
  draw as drawFood,
  FOOD_LEFT,
  TOTAL_FOOD,
  food,
  restartFood,
} from "./food.js";
import { inputDirection, lastInputDirection, restartInput } from "./input.js";

export const GRID_SIZE_X = 24;
export const GRID_SIZE_Y = 40;
export let gameOver = false;

let lastRenderTime = 0;
const gameBoard = document.getElementById("gameBoard");

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
  updateSnake();
  updateFood();
  checkDeath();
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

function startGame() {
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
}

function restartGame() {
  setGameOver(false);
  lastRenderTime = 0;

  restartFood();

  restartSnake();

  restartInput();

  document.getElementById("gameWonState").classList.add("hide");
  document.getElementById("gameOverState").classList.add("hide");
  main();
  startGame();
}

export function gameOverDisplay(won) {
  if (won) {
    document.getElementById("gameWonState").classList.remove("hide");
  } else {
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

const restartBtns = document.getElementsByClassName("restartGame");
for (let i = 0; i < restartBtns.length; i++) {
  restartBtns[i].addEventListener("click", function () {
    restartGame();
  });
}