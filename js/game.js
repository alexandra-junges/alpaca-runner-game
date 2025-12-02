class Game {
    constructor() {
        this.gameStart = document.getElementById("game-start");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEnd = document.getElementById("game-end");
        this.scoreElement = document.getElementById('score');
        this.highScoresElement = document.getElementById('high-scores');

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
        this.obstacles = [];
        this.powerUps = [];

        this.bgSound = new Audio('../sonds/bg-sound.wav');
        this.bgSound.loop = true;
        this.bgSound.volume = ".1";
        this.bumped = new Audio('../sonds/bumped.wav');
        this.bumped.volume = ".1";
        this.lose = new Audio('../sonds/lose.wav');
        this.lose.volume = ".1";
        this.acquire = new Audio('../sonds/acquire.wav');
        this.acquire.volume = ".1";
        this.jump = new Audio('../sonds/jump.wav');
        this.jump.volume = ".1";
    };

    start() {
        this.bgSound.play();
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
        
        if(this.frames % 160 === 0) {
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
                this.bumped.play();
           
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
                this.acquire.play();
            }

            if (currentPowerUp.left + currentPowerUp.width < 0) {
                currentPowerUp.element.remove();
                this.powerUps.splice(j, 1);
                j--;
            }
        }

    };

    gameOver() {
        this.bgSound.pause();
        this.bgSound.currentTime = 0;

        this.lose.play();
        this.gameScreen.style.display = 'none';
        this.gameEnd.style.display = 'flex';

        //this.finalScoreElement.innerText = this.score;
        const highScoresFromLS = JSON.parse(localStorage.getItem("high-scores"));
        if(!highScoresFromLS) {
            localStorage.setItem("high-scores", JSON.stringify([this.score]));
        } else {
            highScoresFromLS.push(this.score);
            highScoresFromLS.sort((a, b) => b - a);

            const topThreeScores = highScoresFromLS.splice(0, 3);
            localStorage.setItem("high-scores", JSON.stringify(topThreeScores));

            topThreeScores.forEach((oneScore) => {
                const liElement = document.createElement("li");
                liElement.innerText = oneScore;
                this.highScoresElement.appendChild(liElement);
            });
        }
    };
};