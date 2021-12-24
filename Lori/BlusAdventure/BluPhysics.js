var bluVX = 0;
var bluVY = 0;
var gravity = 1;
var onGround = false;
var friction = 0.9;

let bluMotionStart, bluMotionPreviousTimeStamp;

function bluMotion(timestamp) {
    if (bluMotionStart === undefined)
        bluMotionStart = timestamp;
    const elapsed = timestamp - bluMotionStart;
    const frameTime = timestamp - bluMotionPreviousTimeStamp;

    if (bluMotionPreviousTimeStamp !== undefined && bluMotionPreviousTimeStamp !== timestamp) {
        bluGravity(frameTime);
        bluActions(frameTime);
        updateBluPosition(frameTime);
        drawBlu();
    }
    bluMotionPreviousTimeStamp = timestamp;
    window.requestAnimationFrame(bluMotion);
}

function bluGravity(frameTime) {
    if (!onGround) bluVY -= gravity * frameTime / 1000 * 500;
}

function bluActions(frameTime) {
    if (space && onGround) {
        bounceStart = undefined;
        bluVY = 450;
        window.requestAnimationFrame(bounce);
    }
    if (left) {
        bluVX = -300;
    }
    if (right) {
        bluVX = 300;
    }
}

function updateBluPosition(frameTime) {
    // bluRX and bluRY should be more directly related to bluVX and blu VY
    let fallingFactor = 5 / (1 + Math.pow(Math.E, 1.735 - bluVY / 250)) - 0.75;
    bluRX -= fallingFactor;
    bluRY += fallingFactor;
    bluRX -= 0.05 * (bluRX - bluSize);
    bluRY -= 0.05 * (bluRY - bluSize);
    bluVX *= friction;
    nextBluX = bluX + bluVX * frameTime / 1000;
    nextBluY = bluY + bluVY * frameTime / 1000;
    checkBluFloorCollision();
    bluX = nextBluX;
    bluY = nextBluY;
}

function checkBluFloorCollision() {
    onGround = false;
    d3.selectAll(".wall").each(function(d) {
        let wallX = d3.select(this).attr("x");
        let wallY = flipY(d3.select(this).attr("y"));
        let wallWidth = d3.select(this).attr("width");
        if (wallX < nextBluX + bluRX && wallX > nextBluX - bluRX - wallWidth) {
            if (wallY > nextBluY - bluRY && wallY < nextBluY) {
                if (bluVY < -25) {
                    bluVY *= -0.5;
                } else if (bluVY < 0) {
                    nextBluY += wallY - (nextBluY - bluRY);
                    bluVY = 0;
                }
                onGround = true;
            }
            if (wallY > nextBluY - bluRY - 1 && wallY < nextBluY) {
                onGround = true;
            }
        }
    })
}




window.requestAnimationFrame(bluMotion);