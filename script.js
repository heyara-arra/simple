// GET HTML ELEMENTS
const celebration = document.getElementById("celebration");
const subtitle = document.getElementById("subtitle");
const message = document.getElementById("message");
const candles = document.getElementById("candles");

const blowButton = document.getElementById("blowButton");
const wishButton = document.getElementById("wishButton");


// CONFETTI ANIMATION
function launchConfetti(amount) {
    const colors = [
        "#f5a8c5",
        "#ffd6e7",
        "#ffe6a7",
        "#d9c2ff",
        "#ffc6a5"
    ];

    for (let i = 0; i < amount; i++) {
        const confetti = document.createElement("div");

        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        confetti.style.animationDelay =
            Math.random() * 0.8 + "s";

        celebration.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}


// BALLOON ANIMATION
function launchBalloons(amount) {
    const colors = [
        "#f5a8c5",
        "#ffd6e7",
        "#ffe6a7",
        "#d9c2ff",
        "#ffc6a5"
    ];

    for (let i = 0; i < amount; i++) {
        const balloon = document.createElement("div");

        balloon.classList.add("balloon");

        balloon.style.left = Math.random() * 95 + "vw";

        balloon.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        balloon.style.animationDuration =
            (5 + Math.random() * 4) + "s";

        balloon.style.animationDelay =
            Math.random() * 2 + "s";

        celebration.appendChild(balloon);

        setTimeout(() => {
            balloon.remove();
        }, 11000);
    }
}


// STARTING SURPRISE
window.addEventListener("load", () => {
    setTimeout(() => {
        launchConfetti(25);
        launchBalloons(8);
    }, 500);
});


// BLOW THE CANDLES
blowButton.addEventListener("click", () => {
    const flames = document.querySelectorAll(".flame");

    flames.forEach((flame) => {
        flame.style.display = "none";
    });

    subtitle.textContent = "Yay! It's your special day! 💗";

    message.textContent =
        "You did it! Now close your eyes and make your most special wish. ✨";

    blowButton.classList.add("hidden");
    wishButton.classList.remove("hidden");

    launchConfetti(45);
});


// MAKE A WISH
wishButton.addEventListener("click", () => {
    subtitle.textContent = "Your wish is on its way! 💖";

    message.textContent =
        "May your wishes come true, your heart stay happy, and your year be full of love! Happy Birthday! 🎂💗";

    wishButton.textContent = "Wish sent! 💌";
    wishButton.disabled = true;

    launchConfetti(100);
    launchBalloons(18);
});
