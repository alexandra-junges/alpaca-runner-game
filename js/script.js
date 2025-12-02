let alpacaGame;
const startBtn = document.getElementById("start-button");
const restartBtn = document.getElementById("restart-button");

startBtn.addEventListener("click", () => {
    startGame();
});

restartBtn.addEventListener("click", () => {
    window.location.reload();
});

window.addEventListener("keydown", (event) => {
    
    if(event.code === "Space") {
        const player = alpacaGame.player;
        alpacaGame.jump.play();
        
        if(!player.isJumping) { // prevents double jump
            player.isJumping = true;
            player.velocityY = player.jumpStrength;
            player.element.src = player.jumpingImg;  
        }
    }
});

function startGame() {
    alpacaGame = new Game();
    alpacaGame.start();
};


