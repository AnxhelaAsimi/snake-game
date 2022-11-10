export let inputDirection = {x: 0, y:0};
export let lastInputDirection = {x: 0, y:0};
let firstInput = 0;
window.addEventListener('keydown', e=>{
    switch(e.key){
        case 'ArrowUp':
            if(lastInputDirection.y !== 0) break
            document.getElementById('arrowUp').classList.add('flash');
            setTimeout(function() {
                document.getElementById('arrowUp').classList.remove('flash');
            }, 500);

            inputDirection = {x: 0, y: -1};
            firstInput = 1;
            break;
        case 'ArrowDown':
            if(lastInputDirection.y !== 0) break
            document.getElementById('arrowDown').classList.add('flash');
            setTimeout(function() {
                document.getElementById('arrowDown').classList.remove('flash');
            }, 500);

            inputDirection = {x: 0, y: 1};
            firstInput = 1;
            break;
        case 'ArrowLeft':
            if(lastInputDirection.x !== 0) break
            document.getElementById('arrowLeft').classList.add('flash');
            setTimeout(function() {
                document.getElementById('arrowLeft').classList.remove('flash');
            }, 500);

            inputDirection = {x: -1, y: 0};
            firstInput = 1;
            break;
        case 'ArrowRight':
            if(lastInputDirection.x !== 0) break
            document.getElementById('arrowRight').classList.add('flash');
            setTimeout(function() {
                document.getElementById('arrowRight').classList.remove('flash');
            }, 500);

            inputDirection = {x: 1, y: 0};
            firstInput = 1;
            break; 
               
    }
    if(firstInput)
        document.getElementById("startGameButton").classList.add('hide');
})

export function getInputDirection(){
    lastInputDirection = inputDirection;
    return inputDirection;
}

export function restartInput(){
    inputDirection = {x: 0, y:0};
    lastInputDirection = {x: 0, y:0};
}