function bounceAnimation(elapsed) {
    let progress = elapsed / bounceDuration;
    let scalingFunction = -Math.cos(14.14 * Math.pow(progress, 3)) / (117.2 * Math.pow(progress + 0.15, 6) + 1) + 1;
    bluRX = bluSize * (1 + Math.sin(scalingFunction * 2 * Math.PI) / 8);
    bluRY = bluSize * (1 - Math.sin(scalingFunction * 2 * Math.PI) / 8);
    drawBlu();
}

let start, previousTimeStamp;

function bounce(timestamp) {
    if (start === undefined)
        start = timestamp;
    const elapsed = timestamp - start;

    if (previousTimeStamp !== timestamp) {
        bounceAnimation(elapsed);
    }

    if (elapsed < bounceDuration) { // Stop the animation after 0.5 seconds
        previousTimeStamp = timestamp
        window.requestAnimationFrame(bounce);
    }
}