class PowerUp {
    constructor(gameScreen, game) {
        this.gameScreen = gameScreen;
        this.game = game;

        this.width = 40;
        this.height = 40;
        this.left = game.width;
        this.top = 335;

        this.element = document.createElement('img');
        this.element.src = "images/life.png"; 
        
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.position = 'absolute';

        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        gameScreen.appendChild(this.element);
    }

    move() {
        this.left -= this.game.speed; 
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
}
