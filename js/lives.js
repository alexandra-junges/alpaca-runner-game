class LivesManager {
    constructor(livesContainer, maxLives = 3) {
        this.livesContainer = document.getElementById(livesContainer);
        this.maxLives = maxLives;
        this.currentLives = maxLives;

        this.heartElements = [];

        this.renderHearts();
    }

    renderHearts() {
        this.livesContainer.innerHTML = "";

        for (let i = 0; i < this.maxLives; i++) {
            const heart = document.createElement("img");
            heart.src = "./images/heart.png";
            heart.classList.add("heart");
            
            this.livesContainer.appendChild(heart);
            this.heartElements.push(heart);
        }
    }

    loseLife() {
        if (this.currentLives > 0) {
            this.currentLives--;
            this.heartElements[this.currentLives].style.display = "none";
        }
        return this.currentLives;
    }

    gainLife() {
        if (this.currentLives < this.maxLives) {
            this.heartElements[this.currentLives].style.display = "inline";
            this.currentLives++;
        }
    }
}
