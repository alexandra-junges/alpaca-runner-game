class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.passed = false;
        
        //difine the obstacles
        this.types = [
            {name: 'cactus', src:"../images/cactus.png", width: 60, height: 80, top: 350 },
            {name: 'rock', src:"../images/rock.png", width: 60, height: 60, top: 385 },
        ];
   
        //random obstacle
        const randomType = this.types[Math.floor(Math.random() * this.types.length)];

        //set obstacle properties
        this.type = randomType.name;
        this.left = this.gameScreen.offsetWidth + Math.floor(Math.random() * 200);
        this.top = randomType.top;
        this.width = randomType.width;
        this.height = randomType.height;

        //DOM < img />
        this.element = document.createElement("img");
        this.element.src = randomType.src;
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
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 5; 
    };
};