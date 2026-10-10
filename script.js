// ===== GET ELEMENTS =====

const openButton = document.getElementById("openButton");
const restartButton = document.getElementById("restartButton");

const navigation = document.getElementById("navigation");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pageIndicator = document.getElementById("pageIndicator");

const pages = [
    document.querySelector(".cover"),
    document.getElementById("birthday"),
    document.getElementById("memories"),
    document.getElementById("reasons"),
    document.getElementById("letter"),
    document.getElementById("final")
];

let currentPage = 0;


// ===== SHOW PAGE =====

function showPage(index) {
    if (index < 0 || index >= pages.length) {
        return;
    }

    currentPage = index;

    pages.forEach((page, i) => {
        page.classList.toggle("hidden", i !== currentPage);
    });

    // Show navigation after opening the cover
    navigation.classList.toggle("hidden", currentPage === 0);

    // Update page number
    if (currentPage === 0) {
        pageIndicator.textContent = "Cover ♡";
    } else {
        pageIndicator.textContent =
            `Page ${currentPage} of ${pages.length - 1}`;
    }

    // Update navigation buttons
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === pages.length - 1;

    // Scroll to top of the scrapbook
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Little hearts on every page
    if (currentPage > 0) {
        createHearts(5);
    }
}


// ===== OPEN THE SCRAPBOOK =====

openButton.addEventListener("click", function () {
    showPage(1);
    createHearts(18);
});


// ===== NEXT PAGE =====

nextButton.addEventListener("click", function () {
    if (currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    }
});


// ===== PREVIOUS PAGE =====

prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
});


// ===== RESTART SCRAPBOOK =====

restartButton.addEventListener("click", function () {
    showPage(0);

    createHearts(15);

    openButton.textContent = "Open your gift ♡";
});


// ===== CLICKABLE LOVE NOTES =====

const reasonCards = document.querySelectorAll(".reason-card");

reasonCards.forEach(card => {
    card.addEventListener("click", function () {
        const message = card.querySelector(".reason-message");

        message.classList.toggle("hidden");
    });
});


// ===== FLOATING HEART ANIMATION =====

function createHearts(amount) {
    const symbols = ["💗", "💕", "♡", "💖", "🌸", "✨"];

    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left = Math.random() * 95 + "vw";

        heart.style.fontSize =
            (16 + Math.random() * 16) + "px";

        heart.style.animationDelay =
            (Math.random() * 1.5) + "s";

        document.body.appendChild(heart);

        heart.addEventListener("animationend", function () {
            heart.remove();
        });
    }
}


// ===== INITIAL STATE =====

showPage(0);
