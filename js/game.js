class Game {
    constructor() {
        this.gameStart = document.getElementById("game-start");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEnd = document.getElementById("game-end");
        this.player = null;
        this.height = 1920;
        this.width = 1080;
        this.obstacles = [];
        //this.score = 0; I don't think I will use scores
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId
        this.gameLoopFrequency = Math.floor(1000 / 60);
    }

    start() {
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.gameStart.style.display = 'none';
        this.gameScreen.style.display = 'block'; // maybe change to "flex" later
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
    }

    gameLoop() {
        this.update();
        if(this.gameIsOver) {
            clearInterval(this.gameIntervalId);
            this.gameOver;
        }
    }

    update() {
        console.log("update method");
    }

    gameOver() {
        console.log("game is over");
    }
}