class Obstacle {
    constructor(gameScreen, game) {
        this.gameScreen = gameScreen;
        this.game = game; 
        this.passed = false;
        
        this.types = [
            {name: 'cactus', src:"../images/cactus.png", width: 40, height: 45, top: 360 },
            {name: 'small-cactus', src:"../images/small-cactus.png", width: 40, height: 45, top: 370 },
            {name: 'pot-cactus', src:"../images/pot-cactus.png", width: 40, height: 45, top: 360 },
            {name: 'rock', src:"../images/rock.png", width: 40, height: 35, top: 380 }, 
            {name: 'stone', src:"../images/stone.png", width: 40, height:35, top: 380 },
        ];

        const randomType = this.types[Math.floor(Math.random() * this.types.length)];

        this.type = randomType.name;
        this.left = this.gameScreen.offsetWidth + Math.floor(Math.random() * 200);
        this.top = randomType.top;
        this.width = randomType.width;
        this.height = randomType.height;

        this.element = document.createElement("img");
        this.element.src = randomType.src;
        this.element.style.position = "absolute";

        this.element.style.height = `${this.height}px`; 
        this.element.style.width = `${this.width}px`;
        
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;   

        this.gameScreen.appendChild(this.element);
    };

    move() {
        this.left -= this.game.speed; 
        this.updatePosition();
    };

    updatePosition() {
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;   
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 5; 
    };
};