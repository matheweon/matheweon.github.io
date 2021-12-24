var bounceDuration = 750;

function bounceAnimation(elapsed) {
    let progress = elapsed / bounceDuration;
    let scalingFunction = -2 * Math.cos(14.14 * Math.pow(progress, 3)) / (8.5 * Math.pow(progress + 0.7, 6) + 1) + 1;
    bluRX = bluRadius * (1 + Math.sin(scalingFunction * 2 * Math.PI) / 8);
    bluRY = bluRadius * (1 - Math.sin(scalingFunction * 2 * Math.PI) / 8);
    drawBlu();
}

let bounceStart, bouncePreviousTimeStamp;

function bounce(timestamp) {
    if (bounceStart === undefined)
        bounceStart = timestamp;
    const elapsed = timestamp - bounceStart;

    if (bouncePreviousTimeStamp !== timestamp) {
        bounceAnimation(elapsed);
    }

    if (elapsed < bounceDuration) { // Stop the animation after 0.5 seconds
        bouncePreviousTimeStamp = timestamp
        window.requestAnimationFrame(bounce);
    }
}