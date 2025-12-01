class Player {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.left = 100;
        this.top = 180;
        this.width = 200;
        this.height = 240;
        this.directionX = 0;

        this.gravity = 0.3;
        this.jumpStrength = -12;     // the force when jumping
        this.velocityY = 2;          // current vertical speed
        this.isJumping = false;      // prevents double jumps
        this.groundLevel = 180;      // where the player stands (your current top position)

        //player < img />
        this.runningImg = "../images/alpaca-stand.png";
        this.jumpingImg = "../images/alpaca-jump.png"

        this.element = document.createElement("img");
        this.element.src = this.runningImg;
        this.element.style.position = "absolute";

        //the alpaca size
        this.element.style.height = `${this.height}px`; 
        this.element.style.width = `${this.width}px`;
        
        // the alpaca position when the game start
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;   

        this.gameScreen.appendChild(this.element);
    };

    move() {
      //left and right movement
        this.left += this.directionX;

        //gravity - to pull the alpaca down
        this.velocityY += this.gravity;
        this.top += this.velocityY;

        //prevent falling through the ground
        if(this.top >= this.groundLevel) {
          this.top = this.groundLevel;
          this.velocityY = 0;

        // switch back to stand
        if(this.isJumping) {
          this.element.src = this.runningImg;
        }

          this.isJumping = false;
        }

        //keep the player on the screen horizontaly
        if(this.left <= 0) {
          this.left = 0;
        }
        if(this.left + this.width >= this.gameScreen.offsetWidth) {
          this.left = this.gameScreen.offsetWidth - this.width;
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