
const $ = (id) => document.getElementById(id);

// Screen navigation
const sections = [
    "welcome",
    "cakeSection",
    "wishSection",
    "photosSection"
];

function showSection(id) {
    sections.forEach((sectionId) => {
        const section = $(sectionId);

        if (section) {
            section.classList.toggle("hidden", sectionId !== id);
        }
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ✨ Floating hearts and sparkles
function createShimmers(amount = 15) {
    const container = $("shimmers");
    if (!container) return;

    for (let i = 0; i < amount; i++) {
        const sparkle = document.createElement("span");

        sparkle.className = "shimmer";
        sparkle.textContent = Math.random() > 0.5 ? "✦" : "♥";
        sparkle.style.left = Math.random() * 100 + "%";
        sparkle.style.top = Math.random() * 100 + "%";
        sparkle.style.fontSize = 10 + Math.random() * 14 + "px";
        sparkle.style.animationDuration = 2 + Math.random() * 4 + "s";

        container.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 6000);
    }
}

createShimmers(30);
setInterval(() => createShimmers(8), 2500);


 // 🎂 Two number-shaped candles: 2 and 3
const candleArea = $("candleArea");

if (candleArea) {
    candleArea.innerHTML = "";

    ["2", "3"].forEach((digit) => {
        const candle = document.createElement("div");
        candle.className = "number-candle";

        const flame = document.createElement("span");
        flame.className = "flame";
        flame.textContent = "🔥";

        const number = document.createElement("span");
        number.className = "candle-digit";
        number.textContent = digit;

        candle.appendChild(flame);
        candle.appendChild(number);
        candleArea.appendChild(candle);
    });
}

// 🎵 Birthday melody
let audioContext;

const melody = [
    [392, 0.3], [392, 0.3], [440, 0.6],
    [392, 0.6], [523, 0.6], [494, 1],
    [392, 0.3], [392, 0.3], [440, 0.6],
    [392, 0.6], [587, 0.6], [523, 1],
    [392, 0.3], [392, 0.3], [784, 0.6],
    [659, 0.6], [523, 0.6], [494, 0.6],
    [440, 1], [698, 0.3], [698, 0.3],
    [659, 0.6], [523, 0.6], [587, 0.6], [523, 1]
];

async function startBirthdayMusic() {
    try {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            const musicStatus = $("musicStatus");
            if (musicStatus) {
                musicStatus.textContent =
                    "Your browser does not support the birthday melody.";
            }
            return;
        }

        if (!audioContext) {
            audioContext = new AudioContextClass();
        }

        await audioContext.resume();

        const musicStatus = $("musicStatus");
        if (musicStatus) {
            musicStatus.textContent = "♫ Happy Birthday, Lovelove Ko ♥";
        }

        let time = audioContext.currentTime + 0.1;

        melody.forEach(([frequency, duration]) => {
            const oscillator = audioContext.createOscillator();
            const volume = audioContext.createGain();

            oscillator.type = "triangle";
            oscillator.frequency.value = frequency;

            volume.gain.setValueAtTime(0.0001, time);
            volume.gain.exponentialRampToValueAtTime(
                0.12,
                time + 0.03
            );
            volume.gain.setValueAtTime(
                0.12,
                time + Math.max(0.04, duration - 0.05)
            );
            volume.gain.exponentialRampToValueAtTime(
                0.0001,
                time + duration
            );

            oscillator.connect(volume);
            volume.connect(audioContext.destination);

            oscillator.start(time);
            oscillator.stop(time + duration);

            time += duration + 0.08;
        });
    } catch (error) {
        console.log("Birthday music could not start:", error);
    }
}

// 💖 Open the surprise
const startButton = $("startButton");

if (startButton) {
    startButton.addEventListener("click", () => {
        showSection("cakeSection");
        startBirthdayMusic();
    });
}

// 🕯️ Blow out the candles
const blowButton = $("blowButton");

if (blowButton) {
    blowButton.addEventListener("click", () => {
        document.querySelectorAll(".flame").forEach((flame) => {
            flame.style.display = "none";
        });

        $("cakeMessage").textContent =
            "The candles are out! Close your eyes and make a wish. ❤️";

        blowButton.classList.add("hidden");
        $("wishButton").classList.remove("hidden");

        createShimmers(35);
    });
}

// ✨ Go to birthday wish
const wishButton = $("wishButton");

if (wishButton) {
    wishButton.addEventListener("click", () => {
        showSection("wishSection");
    });
}

// 📩 Send birthday wish to your email
// Replace YOUR_EMAIL with your actual email address.
const RECEIVER_EMAIL = "YOUR_EMAIL";

const wishForm = $("wishForm");

if (wishForm) {
    wishForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const wish = $("wishText").value.trim();
        const status = $("wishStatus");
        const submitButton = $("sendWishButton");

        if (!wish) {
            status.textContent = "Write your wish first, love. ❤️";
            return;
        }

        if (RECEIVER_EMAIL === "YOUR_EMAIL") {
            status.textContent =
                "Email setup is not finished yet. Please set your email in script.js.";
            return;
        }

        status.textContent = "Sending your wish... ❤️";

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            const response = await fetch(
                "https://formsubmit.co/ajax/" +
                encodeURIComponent(RECEIVER_EMAIL),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        subject: "Birthday Wish 🎂",
                        message: wish,
                        _captcha: "false"
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Email could not be sent.");
            }

            status.textContent =
                "Your wish has been sent! One last surprise awaits... ❤️";

            setTimeout(() => {
                showSection("photosSection");
                createShimmers(35);
            }, 1800);

        } catch (error) {
            status.textContent =
                "Sorry, the wish could not be sent. Check your internet and try again.";
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
                        }
