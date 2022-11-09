import {update as updateSnake, draw as drawSnake, SNAKE_SPEED} from './snake.js';

let lastRenderTime = 0;
const gameBoard = document.getElementById("gameBoard");

//game frame loop
function main(currentTime){
    //requesting browser to rerender frame
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;

    //if there hasn't past enough time, we dont update the lastRenderTime
    if(secondsSinceLastRender < 1 / SNAKE_SPEED)
        return ;

    lastRenderTime = currentTime;
    console.log("render");

    update();
    draw();
}


window.requestAnimationFrame(main);

//updates game params, exx snake position, length, food position
function update(){
    updateSnake();
}

//draws the game items after updating their positions
function draw(){
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
}