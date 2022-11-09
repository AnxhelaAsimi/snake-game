import { getInputDirection } from "./input.js";

//how many time the snake moves per second
export const SNAKE_SPEED = 1;
const snakeBody = [
    {x:11, y:11}
];

export function update() {
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
