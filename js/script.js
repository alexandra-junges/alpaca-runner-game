
    const startBtn = document.getElementById("start-button");
    const restartBtn = document.getElementById("restart-button");

    startBtn.addEventListener("click", () =>{
        startGame();
    })

    function startGame() {
        console.log("start game");
        const alpacaGame = new Game();
        alpacaGame.start();
    }


