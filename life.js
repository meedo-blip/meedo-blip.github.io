// Conway's game of life javascript code
let checkedArr = [];
let usedArr = [];
var playing = false;
let boardWidth = 14;

const gameBoard = document.getElementById("board");

gameBoard.setAttribute("style","grid-template-columns: repeat("+ boardWidth +", 1fr); grid-template-rows: repeat("+ boardWidth +", 1fr);")

checkedArr.push([])

for(i=0; i<=boardWidth+1; i++) {
    checkedArr[0].push(0);
} 

function addCheckBoxes(arr){

    for(h=1; h<=boardWidth; h++){
        for(w=1; w<=boardWidth; w++){
            
            const check = document.createElement("input")
            check.setAttribute("type","checkbox")
            check.setAttribute("id","check-" + h +"-"+ w)

            if(arr.length > 2){
                document.getElementById("pixel-"+ h +"-"+ w).remove();

                if(arr[h][w]){
                    check.setAttribute("style","background-color: #fefcff");
                } 
            }
            gameBoard.appendChild(check)
        }
    }
}
function randomizeCells(){

    if(!playing){
        for(h=1; h<=boardWidth; h++){
            for(w=1; w<=boardWidth; w++){
                
                const ranNum =  Math.floor(Math.random() * 2);

                if(ranNum == 1) document.getElementById("check-" + h +"-"+ w).checked = true;
                else{
                    document.getElementById("check-" + h +"-"+ w).checked = false;
                }

            }
        }    
    }
}
addCheckBoxes([])

// put span elements into bubbles div

const div_bubbles = document.getElementById("bubbles");

function bubblesAndSize() {
    
    const body_width = document.body.offsetWidth;
    const num_bubbles = Math.floor(0.0273 * body_width)

    div_bubbles.innerHTML = "";
    
    for(var i=0; i<num_bubbles; i++){
        const bubble = document.createElement("span");
        bubble.setAttribute("style","--i:"+ (Math.floor(Math.random() * 16) + 10))

        div_bubbles.appendChild(bubble);
    }

    gameBoard.style.height = gameBoard.offsetWidth + "px";
}

bubblesAndSize()

window.addEventListener("resize", bubblesAndSize)

const randomBtn = document.getElementById("random") 
randomBtn.addEventListener("click", randomizeCells)


const startBtn = document.getElementById("start")
startBtn.addEventListener("click", start)

let myInterval;

function start(){

    document.getElementById("start").remove();

    playing = true;

    for(h=1; h<=boardWidth; h++){
        let layer = [0];

        for(w=1; w<=boardWidth; w++){
            const checkbox = document.getElementById("check-" + h +"-"+ w);
            const check = checkbox.checked;
            
            checkbox.remove();

            const pixel = document.createElement("div");
            pixel.setAttribute("class","pixel");
            pixel.setAttribute("id","pixel-" + h +"-"+ w);
            
            if(check){
                pixel.setAttribute("style","background-color: #fefcff");
                layer[w] = 1;
            } else{
                layer[w] = 0;
            }

            gameBoard.appendChild(pixel);
        }
        layer.push(0)
        checkedArr[h] = layer;

    }
    checkedArr.push([])

    for(i=0; i<=boardWidth+1; i++) {
        checkedArr[boardWidth+1].push(0);
    } 

    console.log(2)
    console.log(checkedArr)

    const stopBtn = document.createElement("button");
    stopBtn.setAttribute("id","stop")
    stopBtn.setAttribute("class","btns stop")
    stopBtn.innerHTML = "Stop game"
    
    randomBtn.parentNode.insertBefore(stopBtn, randomBtn)

    console.log(3)

    const stopBtnEl = document.getElementById("stop")
    stopBtnEl.addEventListener("click", function(){

        clearInterval(myInterval);
        stopBtnEl.remove();

        addCheckBoxes(checkedArr)

        const startBtnEl = document.createElement("button");
        startBtnEl.setAttribute("id","start");
        startBtnEl.setAttribute("class","btns start");
        startBtnEl.innerHTML = "Start game"

        for(h=1; h<=boardWidth; h++) {
            for(w=1; w<=boardWidth; w++) document.getElementById("check-"+ h +"-"+ w).removeAttribute("style");
        }
        randomBtn.parentNode.insertBefore(startBtnEl, randomBtn)

        document.getElementById("start").addEventListener("click", start)

        checkedArr.pop();

        playing = false;

    })

    myInterval = setInterval(tick, 200);
}

function tick(){
    // Game of life rules are implemented here every second
    var stop;

    for(h=1; h<=boardWidth; h++) {
        for(w=1; w<=boardWidth; w++){
            var liveNeighbours = 0;
            if(checkedArr[h-1][w-1]) liveNeighbours += 1;
            if(checkedArr[h][w-1]) liveNeighbours += 1;
            if(checkedArr[h-1][w]) liveNeighbours += 1;
            if(checkedArr[h+1][w+1]) liveNeighbours += 1;
            if(checkedArr[h][w+1]) liveNeighbours += 1;
            if(checkedArr[h+1][w]) liveNeighbours += 1;
            if(checkedArr[h+1][w-1]) liveNeighbours += 1;
            if(checkedArr[h-1][w+1]) liveNeighbours += 1;
            
            if(checkedArr[h][w]){
                if(liveNeighbours < 2 || liveNeighbours > 3) {
                    checkedArr[h][w] = 0;
                    stop = false;
                }
            }
            if(checkedArr[h][w] == 0 && liveNeighbours == 3) {
                checkedArr[h][w] = 1;
                stop = false;
            }    

            if(checkedArr[h][w]) {document.getElementById("pixel-"+ h +"-"+ w).setAttribute("style","background-color: #fefcff");}
            else{ 
                document.getElementById("pixel-"+ h +"-"+ w).removeAttribute("style"); 
            }
        }
    }   
}
