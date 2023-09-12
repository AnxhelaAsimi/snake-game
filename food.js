import { onSnake, expandSnake } from "./snake.js";
import { gameOverDisplay, GRID_SIZE_X, GRID_SIZE_Y, setGameOver } from "./game.js";

export let TOTAL_FOOD = 10;
export let FOOD_LEFT = 10;
export let food = { x: 10, y: 8 };
const EXPANSION_RATE = 2;


export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
    FOOD_LEFT-=1;
    document.getElementById('foodWrapper').innerHTML = FOOD_LEFT;
  }
}

export function draw(gameBoard) {
  document.getElementById('foodWrapper').innerHTML = FOOD_LEFT;

  //food inside the game  
  const foodElement = document.createElement("div");
  foodElement.appendChild(document.createElement("div"));
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
  if(FOOD_LEFT==0){
    setGameOver(true);
    gameOverDisplay(1);    
  }
}

export function restartFood(){
  FOOD_LEFT = TOTAL_FOOD;
  food = { x: 10, y: 8 };
}

export function addFood(amount){
  TOTAL_FOOD = TOTAL_FOOD + amount;
  FOOD_LEFT = TOTAL_FOOD;
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
