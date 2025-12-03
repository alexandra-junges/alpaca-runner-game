class Player {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.left = 100;
        this.top = 305;
        this.width = 88;
        this.height = 105;

        this.gravity = 0.6;          //pulls the player down
        this.jumpStrength = -12;     // the force when jumping
        this.velocityY = 0;          // current vertical speed
        this.isJumping = false;      // prevents double jumps
        this.groundLevel = this.top; // where the player stands

        this.standImg = "images/alpaca-stand.png";
        this.runningImg = "images/alpaca-running.png";
        this.jumpingImg = "images/alpaca-jump.png";

        this.element = document.createElement("img");
        this.element.src = this.standImg;
        this.element.classList.add('alpaca-running');

        this.element.style.height = `${this.height}px`; 
        this.element.style.width = `${this.width}px`;
        
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;   

        this.gameScreen.appendChild(this.element);

        //for running animation
        this.runningFrames = [this.standImg, this.runningImg];
        this.currentFrame = 0;
        this.frameCounter = 0;
    };

    move() {
      this.velocityY += this.gravity;
      this.top += this.velocityY;

      if(this.top >= this.groundLevel) {
        this.top = this.groundLevel;
        this.velocityY = 0;

        if(this.isJumping) {
          this.isJumping = false;
          this.element.src = this.standImg;
        }
      }
      if (this.top <= 0) {
        this.top = 0;
        this.velocityY = 0; 
    }

      if (!this.isJumping) {
          this.frameCounter++;
          if (this.frameCounter % 10 === 0) { 
              this.currentFrame = (this.currentFrame + 1) % this.runningFrames.length;
              this.element.src = this.runningFrames[this.currentFrame];
          }
        }
        this.updatePosition();
    };

    updatePosition() {
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;  
        this.element.style.zIndex = 5;  
    };

    didCollide(obstacle) {
      const playerRect = this.element.getBoundingClientRect();
      const obstacleRect = obstacle.element.getBoundingClientRect();

      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
      ) {
        return true;
      } else {
        return false;
      }
  }
};