let alpacaGame
const startBtn = document.getElementById("start-button");
const restartBtn = document.getElementById("restart-button");

startBtn.addEventListener("click", () => {
    startGame();
})

//keyboard events
window.addEventListener("keydown", (event) => {
    console.log("a key was pressed", event)
    if(event.code === "ArrowLeft") {
        alpacaGame.player.directionX = -4;
    }
    if(event.code === "ArrowRight") {
        alpacaGame.player.directionX = 4;
    }
    if(event.code === "Space") {
        alpacaGame.player.directionY = -4;
    }
})

window.addEventListener("keyup", (event) => {
    if(event.code === "ArrowLeft") {
        alpacaGame.player.directionX = 0;
    }
    if(event.code === "ArrowRight") {
        alpacaGame.player.directionX = 0;
    }
    if(event.code === "Space") {
        alpacaGame.player.directionY = 0;
    }
})

function startGame() {
    console.log("start game");
    alpacaGame = new Game();
    alpacaGame.start();
}


