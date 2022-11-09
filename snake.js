import { getInputDirection } from "./input.js";

//how many time the snake moves per second
export const SNAKE_SPEED = 5;

const snakeBody = [
    {x:11, y:11}
];
let newSegments = 0;

export function update() {
    addSegments();
    const inputDirection = getInputDirection();
    for(let i = snakeBody.length - 2; i>=0 ; i--){
        //shifting body parts to the position forward
        snakeBody[i + 1] = {...snakeBody[i]};
    }
    snakeBody[0].x +=inputDirection.x;
    snakeBody[0].y +=inputDirection.y;
}

export function draw(gameBoard) {
    snakeBody.forEach(segment=>
        {
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart =segment.y;
            snakeElement.style.gridColumnStart = segment.x;
            snakeElement.classList.add('snake');
            gameBoard.appendChild(snakeElement);
        })
}

export function expandSnake(amount){
    newSegments += amount;
}

export function onSnake(foodPosition, ignoreHead = false){
    return snakeBody.some((segment,index) => {
        if(ignoreHead && index==0)  return false;
        return segment.x==foodPosition.x && segment.y==foodPosition.y;
    })
}

export function snakeIntersection(){
    return onSnake(snakeBody[0], true);
}

export function getSnakeHead(){
    return snakeBody[0];
}

function addSegments(){
    for(let i = 0; i< newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length-1]});
    }
    newSegments = 0;
}

