import { onSnake, expandSnake } from "./snake.js";
import { GRID_SIZE_X, GRID_SIZE_Y } from "./game.js";

const EXPANSION_RATE = 1;

let food = { x: 10, y: 3 };
export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition = randomGridPosition();
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}

function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE_X) + 1,
    y: Math.floor(Math.random() * GRID_SIZE_Y) + 1,
  };
}
