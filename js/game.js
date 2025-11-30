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
        this.score = 0; 
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId
        this.gameLoopFrequency = Math.floor(1000 / 60);
        //get elements from HTML
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        //keep track of the frames
        this.frames = 0;
    };

    start() {
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.gameStart.style.display = 'none';
        this.gameScreen.style.display = 'flex'; 
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
    };

    gameLoop() {
        //add one to the frames
        this.frames++;
        //push more obstacles to the screen
        if(this.frames % 200 === 0) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }
        this.update();
        if(this.gameIsOver) {
            clearInterval(this.gameIntervalId);
            this.gameOver;
        }
    };

    update() {
        this.player.move();

        //loop for obstacles
        for(let i=0; i < this.obstacles.length; i++) {
            const currentObstacle = this.obstacles[i];
            currentObstacle.move();

            //when there is a collision
            if(this.player.didCollide(currentObstacle)) {
                //remove img from the DOM
                currentObstacle.element.remove();
                //remove obstacle from the array
                this.obstacles.splice(i, 1);
                i--;
                //subtract one life
                this.lives--;
                this.livesElement.innerText = this.lives;
                if(this.lives === 0) {
                    this.gameIsOver = true;
                }
            }

            //when the cactus goes out of the page
            if(currentObstacle.top >= 430) {
                //remove img from the DOM
                currentObstacle.element.remove();
                //remove obstacle from the array
                this.obstacles.splice(i, 1);
                i--;
                //add one point
                this.score++;
                this.scoreElement.innerText = this.score;
            }
        }
    };

    gameOver() {
        console.log("game is over");
        //hide the game screen
        this.gameScreen.style.display = 'none';
        //show the game over screen
        this.gameEnd.style.display = 'flex';
    };
};