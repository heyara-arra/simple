const openButton = document.getElementById("openButton");
const letterButton = document.getElementById("letterButton");

const surprise = document.getElementById("surprise");
const letter = document.getElementById("letter");

openButton.addEventListener("click", function () {
    surprise.classList.remove("hidden");
    openButton.textContent = "Surprise Opened! 💖";
    openButton.disabled = true;

    createHearts(12);

    surprise.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

letterButton.addEventListener("click", function () {
    letter.classList.toggle("hidden");

    if (!letter.classList.contains("hidden")) {
        letterButton.textContent = "Close My Letter 💌";

        createHearts(20);

        letter.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    } else {
        letterButton.textContent = "Read My Secret Letter 💌";
    }
});

function createHearts(amount) {
    const symbols = ["💗", "💕", "💖", "💘", "✨"];

    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("span");

        heart.className = "floating-heart";
        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left = Math.random() * 95 + "vw";
        heart.style.fontSize = (16 + Math.random() * 18) + "px";
        heart.style.animationDelay = (Math.random() * 1.5) + "s";

        document.body.appendChild(heart);

        heart.addEventListener("animationend", function () {
            heart.remove();
        });
    }
}
