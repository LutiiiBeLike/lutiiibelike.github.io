"use strict";

/*
    CHANGE THIS DATE

    Format:
    new Date(year, month - 1, day, hour, minute)

    Important:
    January = 0
    February = 1
    March = 2
    ...
    December = 11

    Example:
    14 February 2025 at 18:30
*/

const relationshipStart = new Date(2026, 3, 17, 17, 41);

const reasons = [
    "because u always know how to make me smile.",
    "because i can completely be myself around u.",
    "because even normal days feel special when i'm with u.",
    "because ur smile makes everything feel better.",
    "because talking to u is always the best part of my day.",
    "because u make me feel safe.",
    "because we can laugh about the dumbest things together.",
    "because u make every memory a little more beautiful.",
    "because i never get tired of seeing ur name pop up on my phone (i actually love it).",
    "because u are beautiful inside and out.",
    "because u support me even when things get difficult.",
    "because being with u feels like home.",
    "because u make me want to become a better person.",
    "because i can imagine so many more memories with u.",
    "because u are simply my favorite person <33"
];

const daysElement = document.querySelector("#days");
const hoursElement = document.querySelector("#hours");
const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");
const relationshipDateElement = document.querySelector("#relationship-date");

const reasonButton = document.querySelector("#reason-button");
const reasonText = document.querySelector("#reason-text");

const letterButtons = document.querySelectorAll(".letter-button");
const letterMessage = document.querySelector("#letter-message");

const loveMeterButton = document.querySelector("#love-meter-button");
const loveMeterFill = document.querySelector("#love-meter-fill");
const loveMeterText = document.querySelector("#love-meter-text");

const surpriseButton = document.querySelector("#surprise-button");
const surpriseMessage = document.querySelector("#surprise-message");

const heartContainer = document.querySelector("#heart-container");

let previousReasonIndex = -1;
let loveMeterHasStarted = false;
let surpriseHasStarted = false;

function displayRelationshipDate() {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    relationshipDateElement.textContent =
        formatter.format(relationshipStart);
}

function updateRelationshipCounter() {
    const now = new Date();
    const difference = now.getTime() - relationshipStart.getTime();

    if (difference <= 0) {
        daysElement.textContent = "0";
        hoursElement.textContent = "0";
        minutesElement.textContent = "0";
        secondsElement.textContent = "0";
        return;
    }

    const totalSeconds = Math.floor(difference / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    daysElement.textContent = totalDays.toLocaleString("en-GB");
    hoursElement.textContent = totalHours.toLocaleString("en-GB");
    minutesElement.textContent = totalMinutes.toLocaleString("en-GB");
    secondsElement.textContent = totalSeconds.toLocaleString("en-GB");
}

function showRandomReason() {
    let newReasonIndex;

    do {
        newReasonIndex = Math.floor(Math.random() * reasons.length);
    } while (
        newReasonIndex === previousReasonIndex &&
        reasons.length > 1
    );

    previousReasonIndex = newReasonIndex;
    reasonText.textContent = reasons[newReasonIndex];

    reasonText.animate(
        [
            {
                opacity: 0,
                transform: "translateY(12px)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],
        {
            duration: 420,
            easing: "ease"
        }
    );
}

function showLetter(event) {
    const selectedButton = event.currentTarget;
    const message = selectedButton.dataset.message;

    letterButtons.forEach((button) => {
        button.classList.remove("active");
    });

    selectedButton.classList.add("active");
    letterMessage.textContent = message;

    letterMessage.animate(
        [
            {
                opacity: 0,
                transform: "scale(0.97)"
            },
            {
                opacity: 1,
                transform: "scale(1)"
            }
        ],
        {
            duration: 400,
            easing: "ease"
        }
    );
}

function startLoveMeter() {
    if (loveMeterHasStarted) {
        loveMeterFill.style.width = "0";
        loveMeterText.textContent = "0%";
        loveMeterHasStarted = false;
        loveMeterButton.textContent = "find out";
        return;
    }

    loveMeterHasStarted = true;
    loveMeterButton.textContent = "wait for it...";

    let percentage = 0;

    const meterInterval = window.setInterval(() => {
        percentage += 1;

        if (percentage <= 100) {
            loveMeterFill.style.width = `${percentage}%`;
            loveMeterText.textContent = `${percentage}%`;
            return;
        }

        window.clearInterval(meterInterval);

        loveMeterFill.style.width = "100%";
        loveMeterText.textContent = "∞% - more than this meter can handle <33";
        loveMeterButton.textContent = "again ♡";

        createHeartBurst(30);
    }, 18);
}

function createHeart() {
    const heart = document.createElement("span");

    const symbols = [
        "♡",
        "♥",
        "💗",
        "💕",
        "💖",
        "🌸",
        "<3"
    ];

    heart.classList.add("floating-heart");
    heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 22 + 16}px`;
    heart.style.animationDuration = `${Math.random() * 3 + 4}s`;

    heartContainer.appendChild(heart);

    window.setTimeout(() => {
        heart.remove();
    }, 8000);
}

function createHeartBurst(amount) {
    let createdHearts = 0;

    const heartInterval = window.setInterval(() => {
        createHeart();
        createHeart();

        createdHearts += 2;

        if (createdHearts >= amount) {
            window.clearInterval(heartInterval);
        }
    }, 90);
}

function showSurprise() {
    if (surpriseHasStarted) {
        surpriseMessage.textContent =
            "yes, i still love u more than words could ever explain ♡";

        createHeartBurst(35);
        return;
    }

    surpriseHasStarted = true;

    surpriseMessage.textContent =
        "too late... now u have to know that i love u endlessly <33";

    surpriseButton.textContent = "press again for more love";
    createHeartBurst(70);
}

function setupScrollAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
}

reasonButton.addEventListener("click", showRandomReason);
loveMeterButton.addEventListener("click", startLoveMeter);
surpriseButton.addEventListener("click", showSurprise);

letterButtons.forEach((button) => {
    button.addEventListener("click", showLetter);
});

displayRelationshipDate();
updateRelationshipCounter();
setupScrollAnimations();

window.setInterval(updateRelationshipCounter, 1000);