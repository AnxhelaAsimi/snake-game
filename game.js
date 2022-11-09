let lastRenderTime = 0;
//how many time the snake moves per second
const SNAKE_SPEED = 1;

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

}

//
function draw(){

}