class LivesManager {
    constructor(containerId, maxLives = 3) {
        this.container = document.getElementById(containerId);
        this.maxLives = maxLives;
        this.currentLives = maxLives;

        this.heartElements = [];

        this.renderHearts();
    }

    renderHearts() {
        this.container.innerHTML = ""; // reset container

        for (let i = 0; i < this.maxLives; i++) {
            const heart = document.createElement("img");
            heart.src = "./images/heart.png";
            heart.classList.add("heart");
            this.container.appendChild(heart);
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
