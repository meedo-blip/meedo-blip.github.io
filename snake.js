// Snake game javascript

// Initialize

const boardLen = 9; // Odd number only, checker pattern only fulfills if boardLen is an odd number
const gameBoard = document.getElementById("gameboard");
const snakeBoard = document.getElementById("snakeboard");
const snakeLen = Math.floor(boardLen / 2);

let pixelWidth;
let snakeHeight;
let snake = [];

class snakePart {
    constructor(index, id) {
        this.element = document.getElementById(id);
        this.top;
        this.left;
        this.x = snakeLen - index;
        this.y = 5;
        this.direction = "E";
        this.rotating = false;
        this.newDirection = "E";
        this.angle = 0;
    } 
}

function buildPixels() {

    const boardStyle = "grid-template-columns: repeat("+ boardLen +", 1fr); grid-template-rows: repeat("+ boardLen +", 1fr);"
    gameBoard.setAttribute("style", boardStyle)
    snakeBoard.setAttribute("style", boardStyle)

    for(i=0; i<boardLen**2; i++) gameBoard.innerHTML += "<div class='px' id='p"+ i +"'></div>";

}

function makeSnake() {

    snakeBoard.innerHTML += "<div id='snakehead'><div class='eyes'><div class='pupil'></div></div><div class='eyes'><div class='pupil'></div></div></div>";

    pixelWidth = snakeBoard.offsetHeight / boardLen;
    snakeHeight = document.getElementById("snakehead").offsetHeight;
    step = pixelWidth / 25;

    for(i=0; i < snakeLen - 2; i++)
        snakeBoard.innerHTML += "<div class='snakebody' id='snakebody"+ i +"'></div>";
    
    snakeBoard.innerHTML += "<div id='snakeback'></div>";

    snake.push(new snakePart(0, "snakehead"));
    for(i=0; i < snakeLen - 2; i++) snake.push(new snakePart(i+1, "snakebody" + i));
    snake.push(new snakePart(snakeLen - 1, "snakeback"));

    console.log("hi people");
}

function alignSnake() {
    for(i=0; i<snakeLen; i++) {
        snake[i].top = pixelWidth*snakeLen + ((pixelWidth - snakeHeight) / 2);
        snake[i].element.style.top =  snake[i].top + "px";

        snake[i].left = pixelWidth*(snakeLen-1) - (pixelWidth*i);
        snake[i].element.style.left = snake[i].left + "px";

        snake[i].angle = 0;
        snake[i].element.style.rotate = "0deg";

        snake[i].direction = snake[i].newDirection = newDirection = "E";
        snake[i].rotating = false;
        posRotate = [];
    }
}

function makeMenu(start) {
    const cover = document.createElement("div");
    cover.setAttribute("id","cover")

    document.body.insertBefore(cover, document.getElementById("buttons").nextSibling);

    if(start){
        cover.innerHTML ='<div id="menu"><div id="header"><h1>Snake Game</h1><img class="emoji" src="images/snake.png"></div><div id="scores"><div class="apple start"><div class="fruit start"></div><div class="stem start"></div></div><div><label for="score">Score:</label><h2 id="score" name="score">'+ score +'</h2></div><img src="images/trophy.png" id="trophy"><div><label for="highscore">High Score:</label><h2 id="highscore" name="highscore">'+ highscore +'</h2></div></div><div id="difficulty"><label for="difficulty">Difficulty:</label> <select name="difficulty" id="select"><option class="option" value="25" style="color:#10bb00;">Easy</option><option class="option" value="20" style="color: yellow;">Normal</option><option class="option" value="10" style="color: #ff4d00;">Hard</option><option class="option" value="5" style="color: red;">Extremly hard</option></select></div><button id="startbtn"><h2 id="startbtntext">Start Game</h2></button>';
    } else if(victory){
        cover.innerHTML ='<div id="menu"><div id="winheader"><div></div><h1 style="-webkit-text-stroke: 1px #3d3d3d; font-size: 3rem; font-weight: 700;">Victory!</h1><h4>You\'ve surpassed your highscore by '+ surpassCount +' apples.</h4></div><div id="scores"><div class="apple start"><div class="fruit start"></div><div class="stem start"></div></div><div><label for="score">Score:</label><h2 id="score" name="score">'+ score +'</h2></div><img src="images/trophy.png" id="trophy"><div><label for="highscore">High Score:</label><h2 id="highscore" name="highscore">'+ highscore +'</h2></div></div><div id="difficulty"><label for="difficulty">Difficulty:</label> <select name="difficulty" id="select"><option class="option" value="25" style="color:#10bb00;">Easy</option><option class="option" value="20" style="color: yellow;">Normal</option><option class="option" value="10" style="color: #ff4d00;">Hard</option><option class="option" value="5" style="color: red;">Extremly hard</option></select></div><button id="startbtn"><h2 id="startbtntext">Start Game</h2></button>';
    } else {
        cover.innerHTML ='<div id="menu"><div id="loseheader"><h1 style="-webkit-text-stroke: 1px #3d3d3d; font-size: 3rem; font-weight: 700;">Game Over!</h1></div><div id="scores"><div class="apple start"><div class="fruit start"></div><div class="stem start"></div></div><div><label for="score">Score:</label><h2 id="score" name="score">'+ score +'</h2></div><img src="images/trophy.png" id="trophy"><div><label for="highscore">High Score:</label><h2 id="highscore" name="highscore">'+ highscore +'</h2></div></div><div id="difficulty"><label for="difficulty">Difficulty:</label> <select name="difficulty" id="select"><option class="option" value="25" style="color:#10bb00;">Easy</option><option class="option" value="20" style="color: yellow;">Normal</option><option class="option" value="10" style="color: #ff4d00;">Hard</option><option class="option" value="5" style="color: red;">Extremly hard</option></select></div><button id="startbtn"><h2 id="startbtntext">Start Game</h2></button>';
    }

    document.getElementById("select").addEventListener("change", updateSelection, true);

    updateSelection(false)

    document.getElementById("startbtn").addEventListener("click", () => {
        alignSnake();
        document.getElementById("cover").remove();
    });
}   

function updateSelection(change) {
    const selectDiff = document.getElementById("select");

    if(change) myIntervalSpeed = parseInt(selectDiff.value);
    else selectDiff.value = String(myIntervalSpeed);

    if(selectDiff.value == "25") selectDiff.style.color = "#10bb00";
    else if(selectDiff.value == "20") selectDiff.style.color = "yellow";
    else if(selectDiff.value == "10") selectDiff.style.color = "#ff4d00";
    else if(selectDiff.value == "5") selectDiff.style.color = "red";
}

function makeSoundPlayers() {
    for(i=0; i<soundFiles.length; i++) {
        const audio = document.createElement("AUDIO");

        audio.setAttribute("controls","controls");
        audio.style.display = "none";
    
        audio.setAttribute("src", soundFiles[i]);

        document.body.appendChild(audio);
        soundFiles[i] = audio;
    }

}

function addEventListeners() {
    // Keyboard event listener
    
    document.addEventListener("keydown", function(e){
        console.log("hi");
        
        if(!playing) {
            start();
        }
    
        if(e.code == "ArrowUp"){
            upBtn.setAttribute("style","background-color: #fbfb3c;");
            newDirection = "N";
        }
            
        else if(e.code == "ArrowLeft"){
            leftBtn.setAttribute("style","background-color: #fbfb3c;");
            newDirection = "W";
        }
    
        else if(e.code == "ArrowDown"){
            downBtn.setAttribute("style","background-color: #fbfb3c;");
            newDirection = "S";
        }  
    
        else if(e.code == "ArrowRight"){
            rightBtn.setAttribute("style","background-color: #fbfb3c;");
            newDirection = "E";
        }
            
    })

    document.addEventListener("keyup", e => { // if key is released
        if(e.code == "ArrowUp") upBtn.setAttribute("style","background-color: #f0f0f0;");
        else if(e.code == "ArrowLeft") leftBtn.setAttribute("style","background-color: #f0f0f0;");
        else if(e.code == "ArrowDown") downBtn.setAttribute("style","background-color: #f0f0f0;");
        else if(e.code == "ArrowRight") rightBtn.setAttribute("style","background-color: #f0f0f0;");
    })

    // listen to the buttons being clicked

    const upBtn = document.getElementById("up")
    const leftBtn = document.getElementById("left")
    const downBtn = document.getElementById("down")
    const rightBtn = document.getElementById("right")

    upBtn.addEventListener("mousedown", () => {
        newDirection = "N";
        if(!playing) start();
    })
    leftBtn.addEventListener("mousedown", () => {
        newDirection = "W";
        if(!playing) start();
    }) 
    downBtn.addEventListener("mousedown", () => {
        newDirection = "S";
        if(!playing) start();
    }) 
    rightBtn.addEventListener("mousedown", () => {
        newDirection = "E";
        if(!playing) start();
    })

}

let newDirection = "E"; // N: up, S: down, E: right, W: left
let myInterval;
let myIntervalSpeed = 25;
let posRotate = [];
let apple;
let playing = false;
let step;
let score = 0;
let highscore = 0;
let madeApple = false;
let victory = false;
let surpassCount;
let startCount = 0;

let soundFiles = [
    "sounds/food-crunch.wav",
    "sounds/lose-horror.wav",
    "sounds/victory.mp3"
];

const angleStep = 90 / 25; 

function initialize() {
    buildPixels();
    makeSnake();
    alignSnake();
    makeSoundPlayers();
    makeMenu(true);
}

function start() {
    if(startCount == 0) snakeBoard.removeChild(document.getElementById("reminder"));
    startCount++;

    makeApple();

    playing = true;

    myInterval = setInterval(move, myIntervalSpeed);
}

function move() {

    const x = Math.floor(snake[0].left / pixelWidth) + 1;
    const y = Math.floor(snake[0].top / pixelWidth) + 1;

    if(x > boardLen + 1 || y > boardLen || x < 0 || y < 0) {
        stop();
        return; 
    }
    if(x != snake[0].x || y != snake[0].y) {
        
        for(i=0; i<snake.length; i++){
            snake[i].x = x-i;
            snake[i].y = y-i;
        }

        checkPos();
    }

    for(i=0; i<posRotate.length; i++) {
        for(j=0; j<snake.length; j++){
            if(posRotate[i][0] == j) {
                console.log("hi")
                snake[j].rotating = true;
                rotate(j, i);
                break;
            }
        }
    }

    for(i=0; i<snakeLen; i++) {

        if(!snake[i].rotating){

            if(snake[i].direction == "N"){
                snake[i].top -= step;
                snake[i].element.style.top = snake[i].top + "px";            
            }
            else if(snake[i].direction == "S"){
                snake[i].top += step; 
                snake[i].element.style.top = snake[i].top +  "px";   
            }
            else if(snake[i].direction == "E"){
                snake[i].left += step;
                snake[i].element.style.left = snake[i].left +  "px";
            }
            else if(snake[i].direction == "W"){ 
                snake[i].left -= step;
                snake[i].element.style.left = snake[i].left +  "px";   
            }

        }
        
    }

}

function rotate(part, rotation) {

    const newDirect = posRotate[rotation][1].newDirection;

    if(posRotate[rotation][1].clock == 0) {    
        for (let i = 0; i < snake.length; i++) {
            if(newDirect == "N" && snake[i].direction == "E") snake[i].angle = 360;
            else if(newDirect == "E" && snake[i].direction == "N") snake[i].angle = 270; 
            else if(newDirect == "N" && snake[i].direction == "W") snake[i].angle = 180;
            else if(newDirect == "S" && snake[i].direction == "E") snake[i].angle = 0;
            else if(newDirect == "E" && snake[i].direction == "S") snake[i].angle = 90;
            else if(newDirect == "W" && snake[i].direction == "S") snake[i].angle = 90;
            else if(newDirect == "W" && snake[i].direction == "N") snake[i].angle = 270;
            else if(newDirect == "S" && snake[i].direction == "W") snake[i].angle = 180;
        }
    }

    if(newDirect == "N" && snake[part].direction == "E" || (newDirect == "E" && snake[part].direction == "N")){
        snake[part].top -= step;
        snake[part].element.style.top = snake[part].top + "px";
        snake[part].left += step;
        snake[part].element.style.left = snake[part].left + "px";   
        
        if(newDirect == "E"){
            snake[part].angle += angleStep;
        } else {
            snake[part].angle -= angleStep;
        }
        snake[part].element.style.rotate = snake[part].angle + "deg";
    }
    else if(newDirect == "S" && snake[part].direction == "E" || (newDirect == "E" && snake[part].direction == "S")){
        snake[part].top += step;
        snake[part].element.style.top = snake[part].top + "px";
        snake[part].left += step;
        snake[part].element.style.left = snake[part].left + "px";    

        if(newDirect == "E"){
            snake[part].angle -= angleStep;
        } else {
            snake[part].angle += angleStep;
        }
        snake[part].element.style.rotate = snake[part].angle + "deg";
    }
    else if(newDirect == "N" && snake[part].direction == "W" || (newDirect == "W" && snake[part].direction == "N")){
        snake[part].top -= step;
        snake[part].element.style.top = snake[part].top + "px";
        snake[part].left -= step;
        snake[part].element.style.left = snake[part].left + "px"; 
        
        if(newDirect == "W"){
            snake[part].angle -= angleStep;
        } else {
            snake[part].angle += angleStep;
        }
        snake[part].element.style.rotate = snake[part].angle + "deg";
    }
    else if(newDirect == "S" && snake[part].direction == "W" || (newDirect == "W" && snake[part].direction == "S")){
        snake[part].top += step;
        snake[part].element.style.top = snake[part].top + "px";
        snake[part].left -= step;
        snake[part].element.style.left = snake[part].left + "px";    

        if(newDirect == "W"){
            snake[part].angle += angleStep;
        } else {
            snake[part].angle -= angleStep;
        }
        snake[part].element.style.rotate = snake[part].angle + "deg";
    }
    
    posRotate[rotation][1].clock++;

    if(posRotate[rotation][1].clock == 25){ 

        posRotate[rotation][1].clock = 0;
        snake[part].direction = newDirect;
        snake[part].rotating = false;

        snake[part].top = toNearest(snake[part].top, pixelWidth);
        snake[part].y = (snake[part].top / pixelWidth) + 1;

        snake[part].left = toNearest(snake[part].left, pixelWidth);
        snake[part].x = (snake[part].left / pixelWidth) + 1;

        snake[part].angle = toNearest(snake[part].angle, 90);
        
        posRotate[rotation][0]++;

        // Removes first element in the array
        if(posRotate[rotation][0] >= snake.length) posRotate.shift(); 
    }

}

function checkPos() {
    snake[0].newDirection = newDirection; 

    if(snake[0].direction != snake[0].newDirection && snake[0].direction != opposite(snake[0].newDirection) && !snake[0].rotating) { 

        snake[0].rotating = true;   
    
        posRotate.push([0, {clock:0 , newDirection: snake[0].newDirection}]);
    }

    if(snake[0].x == apple.x && snake[0].y == apple.y || (snake[0].x == apple.x && snake[0].y - 1 == apple.y) || (snake[0].x - 1 == apple.x && snake[0].y == apple.y) || (snake[0].x + 1 == apple.x && snake[0].y == apple.y) || (snake[0].x == apple.x && snake[0].y + 1 == apple.y)){ // eat apple
        score++;
        apple.element.innerHTML = '';

        soundFiles[0].play();
        makeApple();
    }
}

function toNearest(angle, denom) {
    return Math.round(angle/denom) * denom;
}

function opposite(d) {
    if(d == "N") return "S";
    if(d == "S") return "N";
    if(d == "E") return "W";
    if(d == "W") return "E";
}

function makeApple() {
    const pos = Math.floor(Math.random() * (boardLen**2));
    const pixel = document.getElementById("p" + pos); // Random pixel

    if(madeApple) apple.element.innerHTML = '';

    apple = {element: pixel, x: pos - (Math.floor(pos / boardLen) * boardLen) + 1, y: Math.floor(pos / boardLen) + 1};

    let remakeApple = false;

    for(let i=0; i<snake.length; i++){
        if(snake[i].x == apple.x && snake[i].y == apple.y) {
            remakeApple = true;
            break;
        }
    }   

    if(remakeApple) makeApple();
    else {
        pixel.innerHTML = '<div class="apple game"><div class="fruit game"></div><div class="stem game"></div></div>';
        madeApple = true;
    }
}


function stop() {
    clearInterval(myInterval);

    playing = false;
    surpassCount = score - highscore;

    if(surpassCount < 0) surpassCount = 0;

    highscore += surpassCount;

    if(surpassCount >= 5){
        victory = true;
        soundFiles[2].play();
    } 
    else if(surpassCount < 5) {
        victory = false;
        soundFiles[1].play();
    } 
    else victory = false;

    makeMenu(false);
}

// Initial start functions
initialize();
addEventListeners();
