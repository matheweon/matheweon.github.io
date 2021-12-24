var bluVX = 0;
var bluVY = 0;
var gravity = 1;
var onGround = false;

let bluMotionStart, bluMotionPreviousTimeStamp;

function bluMotion(timestamp) {
    if (bluMotionStart === undefined)
        bluMotionStart = timestamp;
    const elapsed = timestamp - bluMotionStart;
    const frameTime = timestamp - bluMotionPreviousTimeStamp;

    if (bluMotionPreviousTimeStamp !== undefined && bluMotionPreviousTimeStamp !== timestamp) {
        bluGravity(frameTime);
        updateBluPosition(frameTime);
        drawBlu();
    }
    bluMotionPreviousTimeStamp = timestamp;
    window.requestAnimationFrame(bluMotion);
}

function bluGravity(frameTime) {
    if (!onGround) bluVY -= gravity * frameTime / 1000 * 500;
}

function updateBluPosition(frameTime) {
    nextBluX = bluX + bluVX * frameTime / 1000;
    nextBluY = bluY + bluVY * frameTime / 1000;
    checkBluFloorCollision()
    bluX = nextBluX;
    bluY = nextBluY
}

function checkBluFloorCollision() {
    onGround = false;
    d3.selectAll(".wall").each(function(d) {
        let wallY = flipY(d3.select(this).attr("y"));
        if (wallY > nextBluY - bluRY && wallY < nextBluY + bluRY) {
            if (bluVY < -50) {
                bluVY *= -0.5;
            } else if (bluVY < 0) {
                nextBluY += wallY - (nextBluY - bluRY);
                bluVY = 0;
            }
            onGround = true;
        }
    })
}


window.requestAnimationFrame(bluMotion);