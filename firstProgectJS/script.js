let board;
let boardW = 750;
let boardH = 250;
let context;


let dinoW = 88;
let dinoH = 94;
let dinoX = 50;
let dinoY = boardH - dinoH;
let dinoImg;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoW,
    height: dinoH
}

let cactusArray = [];

let cactus1W = 34;
let cactus2W = 69;

let cactusW = 100;
let cactusH = 70;
let cactusX = 700;
let cactusY = boardH - cactusH;


let cactus1Img = new Image();
cactus1Img.src = "./img/cactus1_piccolo.png";

let cactus2Img = new Image();
cactus2Img.src = "./img/cactus2_piccolo.png";

let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;


window.onload = function () {
    board = document.getElementById("board");
    board.height = boardH;
    board.width = boardW;

    context = board.getContext("2d");

    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";
    dinoImg.onload = function () {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }


    requestAnimationFrame(update);
    setInterval(placeCactus, 700);
    document.addEventListener("keydown",moveDino);
    document.addEventListener("keydown", resetRun);
}

function update() {
    
    requestAnimationFrame(update);
    
    if (gameOver) {
        return;
    }
    
    context.clearRect(0, 0, board.width, board.height);

    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
        
        if(detectCollision(dino, cactus)){
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png";
            dinoImg.onload = function(){
            context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            context.fillText("Premi ctrl + r per riavviare",80,80);
            }
        }
    }

    context.fillStyle="black";
    context.font="20px";
    score++;
    context.fillText(score, 5,10);
}

function moveDino(e) {
    if (gameOver) {
        return;
    }

    if(e.code == "Space" && dino.y == dinoY){
        velocityY = -10;
    }
}

/*function resetRun(e){
    if(e.code == "R"){
        /*gameOver = false; 
        dino.x = dinoX;
        dino.y = dinoY;
        cactus.x = cactusX;
        board.reset();
        board.restore();
    }
}*/

function placeCactus() {

    if (gameOver) {
        return;
    }

    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusH
    }

    let placeCactusChance = Math.random();

    if (placeCactusChance > .70) {
        cactus.img = cactus2Img;
        cactus.width = cactus2W;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .40) {
        cactus.img = cactus1Img;
        cactus.width = cactus2W;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 5) {
        cactusArray.shift();
    }
}

function detectCollision(a, b){
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}