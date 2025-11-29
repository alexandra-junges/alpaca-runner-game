class Game {
    constructor() {
        this.gameStart = document.getElementById("game-start");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEnd = document.getElementById("game-end");
        //creating a new player, appeding to the screen and setting the size and position
        this.player = new Player(this.gameScreen, 100, 180, 200, 240);
        this.height = 430;
        this.width = 1000;
        //creating a new obstacle and appeding to the screen
        this.obstacles = [new Obstacle(this.gameScreen)];
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
        this.player.move();
        this.obstacles.move();
    }

    gameOver() {
        console.log("game is over");
    }
}