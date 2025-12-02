class Game {
    constructor() {
        this.gameStart = document.getElementById("game-start");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEnd = document.getElementById("game-end");
        this.scoreElement = document.getElementById('score');

        this.player = new Player(this.gameScreen);
        this.livesManager = new LivesManager("lives", 3);
        this.height = 470;
        this.width = 1000;
        this.score = 0; 
        this.speed = 3;
        this.frames = 0;
        this.gameIsOver = false;
        this.gameIntervalId
        this.gameLoopFrequency = Math.floor(1000 / 60);
        this.obstacles = []; //new Obstacle(this.gameScreen)
        this.powerUps = [];
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
        this.frames++;
        //gradually increase speed
        this.speed += 0.002;
        
        if(this.frames % 190 === 0) {
            this.obstacles.push(new Obstacle(this.gameScreen, this));
        }

        if (this.frames % 800 === 0) { 
            this.powerUps.push(new PowerUp(this.gameScreen, this));
        }

        this.update();
        if(this.gameIsOver) {
            clearInterval(this.gameIntervalId);
            this.gameOver();
        }
    };

    update() {
        this.player.move();

        for(let i=0; i < this.obstacles.length; i++) {
            const currentObstacle = this.obstacles[i];
            currentObstacle.move();

            if(this.player.didCollide(currentObstacle)) {
                currentObstacle.element.remove();
                //remove obstacle from the array
                this.obstacles.splice(i, 1);
                i--;
           
                const remainingLives = this.livesManager.loseLife();
                if (remainingLives === 0) {
                    this.gameIsOver = true;
                }
            }

            //check if player passed the obstacle
            if(!currentObstacle.passed && currentObstacle.left + currentObstacle.width < this.player.left) {
                currentObstacle.passed = true;
                this.score++;
                this.scoreElement.innerText = this.score;
            }

            //remove obstacle if fully left the screen
            if(currentObstacle.left + currentObstacle.width < 0) {
                currentObstacle.element.remove();
                this.obstacles.splice(i, 1);
                i--;
            }
        }

        for (let j = 0; j < this.powerUps.length; j++) {
            const currentPowerUp = this.powerUps[j];
            currentPowerUp.move();

            if (this.player.didCollide(currentPowerUp)) {
                currentPowerUp.element.remove();
                this.powerUps.splice(j, 1);
                j--;

                // add one life     
                this.livesManager.gainLife();
            }

            if (currentPowerUp.left + currentPowerUp.width < 0) {
                currentPowerUp.element.remove();
                this.powerUps.splice(j, 1);
                j--;
            }
        }

    };

    gameOver() {
        this.gameScreen.style.display = 'none';
        this.gameEnd.style.display = 'flex';
    };
};