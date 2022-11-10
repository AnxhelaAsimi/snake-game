import { getInputDirection } from "./input.js";

//how many time the snake moves per second
export const SNAKE_SPEED = 7;
export let snakeBody = [{x:10, y:13}];
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
    snakeBody.forEach((segment, index)=>
        {
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart =segment.y;
            snakeElement.style.gridColumnStart = segment.x;  
            snakeElement.style.background = "linear-gradient("+ getGradientDirection()+",hsla(162, 66%, 56%, "+ (1 - index * 1/snakeBody.length) +"), hsla(162, 66%, 56%, "+ (1 - (index+1) * 1/snakeBody.length) +")";
            if(index == 0)
            {
                snakeElement.style.borderRadius = getBorderRadius();
            }
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

export function restartSnake(){
    newSegments = 0;
    snakeBody = [{x:10, y:13}];
}

function addSegments(){
    for(let i = 0; i< newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length-1]});
    }
    newSegments = 0;
}

//returns the gradient direction based on where the snake is headed
function getGradientDirection(){
    if( getInputDirection().y ==-1)
        return "to bottom";
    if(getInputDirection().y==1)
        return "to top";
    if(getInputDirection().x == -1)
        return "to right";
    if(getInputDirection().x == 1)
        return "to left";
    else
        return "to bottom";
}

//returns border radius style of head, depending on its direction
function getBorderRadius(){
    if( getInputDirection().y ==-1)
        return "10px 10px 0px 0px";
    if(getInputDirection().y==1)
        return "0px 0px 10px 10px";
    if(getInputDirection().x == -1)
        return "10px 0px 0px 10px";
    if(getInputDirection().x == 1)
        return "0px 10px 10px 0px";
    else
        return "10px 10px 0px 0px";
}