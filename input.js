import { addFood } from './food.js';
import { restartGame, startGame } from './game.js';


export let inputDirection = {x: 0, y:0};
export let lastInputDirection = {x: 0, y:0};
let firstInp=true;
window.addEventListener('keydown', e=>{
    switch(e.key){
        case 'ArrowUp':
            if(lastInputDirection.y !== 0) break
            document.getElementById('arrowUp').classList.add('flash');
            if(firstInp){
                document.getElementById("buttonWrapper").classList.remove("startGame");
                document.getElementById("buttonWrapper").classList.add("resetGame");
            }
            setTimeout(function() {
                document.getElementById('arrowUp').classList.remove('flash');
            }, 500);
            inputDirection = {x: 0, y: -1};
            firstInp = false;
            break;
        case 'ArrowDown':
            if(lastInputDirection.y !== 0) break
            document.getElementById('arrowDown').classList.add('flash');
            setTimeout(function() {
                document.getElementById('arrowDown').classList.remove('flash');
            }, 500);

            inputDirection = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if(lastInputDirection.x !== 0) break
            document.getElementById('arrowLeft').classList.add('flash');
            setTimeout(function() {
                document.getElementById('arrowLeft').classList.remove('flash');
            }, 500);

            inputDirection = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if(lastInputDirection.x !== 0) break
            document.getElementById('arrowRight').classList.add('flash');
            setTimeout(function() {
                document.getElementById('arrowRight').classList.remove('flash');
            }, 500);

            inputDirection = {x: 1, y: 0};
            break; 
        case '+':
            addFood(1);
            break;    
        case '-':
            addFood(-1);
            break;       
        case ' ':
            restartGame();
            break;  
        case 'Enter':
            startGame();
            break;                        
    }
})

export function getInputDirection(){
    lastInputDirection = inputDirection;
    return inputDirection;
}

export function restartInput(){
    inputDirection = {x: 0, y:0};
    lastInputDirection = {x: 0, y:0};
}