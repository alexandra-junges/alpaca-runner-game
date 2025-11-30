class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.possibleLeftPosition = [700, 850];
        this.left = this.possibleLeftPosition[
            Math.floor(Math.random() * this.possibleLeftPosition.length)
        ];
        this.top = 350;
        this.width = 50;
        this.height = 60;

        //cactus < img />
        this.element = document.createElement("img");
        this.element.src = '../images/cactus.png';
        this.element.style.position = "absolute";

        //the cactus size
        this.element.style.height = `${this.height}px`; 
        this.element.style.width = `${this.width}px`;
        
        // the cactus position when the game start
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;   

        this.gameScreen.appendChild(this.element);
    };

    move() {
        this.left -= 3;
        this.updatePosition();
    };

    updatePosition() {
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;   
    };
};