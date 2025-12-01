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
        this.lives = 3;
        this.speed = 3;
        this.gameIsOver = false;
        this.gameIntervalId
        this.gameLoopFrequency = Math.floor(1000 / 60);
        //creating a new obstacle and appeding to the screen
        this.obstacles = []; //new Obstacle(this.gameScreen)
        this.powerUps = [];
        //get elements from HTML
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.querySelectorAll('#lives .heart');
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
                //subtract one life
                this.lives--;

                //remove heart image from DOM
                this.livesElement[this.lives].style.display = 'none';

                console.log('score:', this.score);
                console.log('lives', this.lives);

                if(this.lives === 0) {
                    this.gameIsOver = true;
                }

                break; 
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

        for (let i = 0; i < this.powerUps.length; i++) {
            const currentPowerUp = this.powerUps[i];
            currentPowerUp.move();

            if (this.player.didCollide(currentPowerUp)) {
            // remove from screen and array
            currentPowerUp.element.remove();
            this.powerUps.splice(i, 1);
            i--;

            // add one life     
            if (this.lives < this.livesElement.length) { 
                this.lives++;
                this.livesElement[this.lives - 1].style.display = 'inline';
            }
            }

            // remove if passed the left edge
            if (currentPowerUp.left + currentPowerUp.width < 0) {
                currentPowerUp.element.remove();
                this.powerUps.splice(i, 1);
                i--;
            }
        }

    };

    gameOver() {
        this.gameScreen.style.display = 'none';
        this.gameEnd.style.display = 'flex';
    };
};