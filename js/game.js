class Game {
    constructor() {
        this.gameStart = document.getElementById("game-start");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEnd = document.getElementById("game-end");
        //creating a new player, appeding to the screen and setting the size and position
        this.player = new Player(this.gameScreen);
        this.height = 470;
        this.width = 1000;
        this.score = 0; 
        this.speed = 3;
        this.gameIsOver = false;
        this.gameIntervalId
        this.gameLoopFrequency = Math.floor(1000 / 60);
        //creating a new obstacle and appeding to the screen
        this.obstacles = []; //new Obstacle(this.gameScreen)
        this.powerUps = [];
        //get elements from HTML
        this.scoreElement = document.getElementById('score');
        this.livesManager = new LivesManager("lives", 3);
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
        //gradually increase speed
        this.speed += 0.002;
        //push more obstacles to the screen
        if(this.frames % 190 === 0) {
            this.obstacles.push(new Obstacle(this.gameScreen, this));
        }

        //push lifes to the screen
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
           
                const remainingLives = this.livesManager.loseLife();
                if (remainingLives === 0) {
                    this.gameIsOver = true;
                }
               // break; 
            }

            //check if player passed the obstacle
            if(!currentObstacle.passed && currentObstacle.left + currentObstacle.width < this.player.left) {
                currentObstacle.passed = true;
                //add one point
                this.score++;
                this.scoreElement.innerText = this.score;
            }

            //remove obstacle if fully left the screen
            if(currentObstacle.left + currentObstacle.width < 0) {
                //remove img from the DOM
                currentObstacle.element.remove();
                //remove obstacle from the arrayd
                this.obstacles.splice(i, 1);
                i--;
            }
        }

        for (let j = 0; j < this.powerUps.length; j++) {
            const currentPowerUp = this.powerUps[j];
            currentPowerUp.move();
            console.log(this.powerUps[j]);
            if (this.player.didCollide(currentPowerUp)) {
            // remove from screen and array
            currentPowerUp.element.remove();
            this.powerUps.splice(j, 1);
            j--;

            // add one life     
            this.livesManager.gainLife();
            }
            // remove if passed the left edge
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