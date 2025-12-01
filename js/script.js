let alpacaGame;
const startBtn = document.getElementById("start-button");
const restartBtn = document.getElementById("restart-button");

startBtn.addEventListener("click", () => {
    startGame();
});

restartBtn.addEventListener("click", () => {
    window.location.reload();
});

//keyboard events
window.addEventListener("keydown", (event) => {

    if(event.code === "ArrowLeft") {
        alpacaGame.player.directionX = -4;
    }
    if(event.code === "ArrowRight") {
        alpacaGame.player.directionX = 4;
    }
    if(event.code === "Space") {
        const player = alpacaGame.player;

        if(!player.isJumping) { // prevents double jump
            player.isJumping = true;
            player.velocityY = player.jumpStrength;
            player.element.src = player.jumpingImg;  
        }
    }
});

window.addEventListener("keyup", (event) => {
    if(event.code === "ArrowLeft") {
        alpacaGame.player.directionX = 0;
    }
    if(event.code === "ArrowRight") {
        alpacaGame.player.directionX = 0;
    }
});

function startGame() {
    alpacaGame = new Game();
    alpacaGame.start();
};


