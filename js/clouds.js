function createCloud() {
    const container = document.getElementById("cloud-container");

    const cloud = document.createElement("img");
    cloud.src = "../images/cloud.png";
    cloud.classList.add("cloud");

    const randomTop = Math.random() * 150; // vertical position
    const randomSize = 40 + Math.random() * 80; // between 40-120px
    const randomSpeed = 15 + Math.random() * 20;  // 15-35seconds

    cloud.style.top = `${randomTop}px`;
    cloud.style.width = `${randomSize}px`;
    cloud.style.animationDuration = `${randomSpeed}s`;

    container.appendChild(cloud);

    cloud.addEventListener("animationend", () => {
        cloud.remove();
    });
};

function startClouds() {
    for (let i = 0; i < 3; i++) {
        createCloud();
    }

    setInterval(createCloud, 3000);
};