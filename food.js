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
  }
}

export function draw(gameBoard) {
  //draw food list
  const foodListContainer = document.getElementById("foodList");
  foodListContainer.innerHTML = "";
  for(let i=0; i<TOTAL_FOOD; i++){
    if(i>=FOOD_LEFT)
      foodListContainer.innerHTML += '<div class="restingFood" style="opacity:0.3"><div></div></div>';
    else
      foodListContainer.innerHTML += '<div class="restingFood"><div></div></div>';
  }

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
