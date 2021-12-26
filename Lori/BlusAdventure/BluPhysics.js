var bluVX = 0;
var bluVY = 0;
var gravity = zoom;
var onGround = true;
var groundFriction = 0.9;
var airFriction = 0.925;
var bluJumpPowerDefault = 360;
var bluSpeedDefault = 30;
var bluJumpPower = bluJumpPowerDefault * zoom;
var bluSpeed = bluSpeedDefault * zoom;

let bluMotionStart, bluMotionPreviousTimeStamp;

// Current timestamp is passed in by window.requestAnimationFrame()
function bluMotion(timestamp) {
    if (bluMotionStart === undefined)
        bluMotionStart = timestamp;
    const elapsed = timestamp - bluMotionStart;
    const frameTime = timestamp - bluMotionPreviousTimeStamp;

    if (bluMotionPreviousTimeStamp !== undefined) {
        introZoom(frameTime);
        if (gameStarted) {
            bluGravity(frameTime);
            bluActions(frameTime);
            updateBluPosition(frameTime);
        }
        drawBlu();
    }
    bluMotionPreviousTimeStamp = timestamp;
    window.requestAnimationFrame(bluMotion);
}

function bluGravity(frameTime) {
    if (!onGround) bluVY -= gravity * frameTime / 1000 * 500;
}

function bluActions(frameTime) {
    if ((space || up || click) && onGround) {
        bluVY = bluJumpPower;
        bounceStart = undefined;
        window.requestAnimationFrame(bounce);
    }
    if (click) {
        click = false;
    }
    if (left) {
        bluVX -= bluSpeed;
    }
    if (right) {
        bluVX += bluSpeed;
    }
    bluVX += (2 / (1 + Math.pow(Math.E, -gamma / 5)) - 1) * bluSpeed;
    if (shift) {
        bounceStart = undefined;
        window.requestAnimationFrame(bounce);
    }
}

function updateBluPosition(frameTime) {
    // TODO: bluRX and bluRY should be more directly related to bluVX and blu VY
    let fallingFactor = 5 / (1 + Math.pow(Math.E, 1.735 - bluVY / 250)) - 0.75;
    bluRX -= fallingFactor;
    bluRY += fallingFactor;
    bluRX -= 0.05 * (bluRX - bluRad);
    bluRY -= 0.05 * (bluRY - bluRad);
    if (onGround) {
        bluVX *= groundFriction;
    } else {
        bluVX *= airFriction;
    }
    nextBluX = bluX + bluVX * frameTime / 1000;
    nextBluY = bluY + bluVY * frameTime / 1000;
    checkBluFloorCollision();
    bluX = nextBluX;
    bluY = nextBluY;
}

function checkBluFloorCollision() {
    onGround = false;
    d3.selectAll(".block").each(function(d) {
        let blockX = d3.select(this).attr("x");
        let blockY = flipY(d3.select(this).attr("y"));
        let blockWidth = d3.select(this).attr("width");
        if (blockX < nextBluX + bluRX && blockX > nextBluX - bluRX - blockWidth) {
            if (blockY > nextBluY - bluRY && blockY < nextBluY) {
                if (bluVY < -25) {
                    bluVY *= -0.5;
                } else if (bluVY < 0) {
                    nextBluY += blockY - (nextBluY - bluRY);
                    bluVY = 0;
                }
                onGround = true;
            }
            if (blockY > nextBluY - bluRY - 1 && blockY < nextBluY || blockY > bluY - bluRY - 1 && blockY < bluY) {
                onGround = true;
            }
        }
    })
}




window.requestAnimationFrame(bluMotion);