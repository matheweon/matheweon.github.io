var startingZoom = 4;
var finalZoom = 0.5;
var zoom = startingZoom;
var introZoomProgress = -1;
var bluRad = 32 * zoom;
var bluSize = 2 * bluRad;
var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;
var bluX = bluSize;
var bluY = bluSize * 1.5;
var bluRX = bluRad;
var bluRY = bluRad;
var space = false;
var up = false;
var down = false;
var left = false;
var right = false;
var shift = false;
var enter = false;
var esc = false;
var click = false;
var deviceOrientationGranted = false;
var levelNum = 1;
var gameStarted = false;
var alpha = 0;
var beta = 0;
var gamma = 0;

function flipY(y) {
    return gameHeight - y;
}

function updateZoom(z) {
    let ratio = z / zoom;
    zoom = z;
    bluRad = 32 * zoom;
    bluSize = 2 * bluRad;
    bluX *= ratio;
    bluY *= ratio;
    bluRX *= ratio;
    bluRY *= ratio;
    bluJumpPower = bluJumpPowerDefault * zoom;
    bluSpeed = bluSpeedDefault * zoom;
    gravity = zoom;
    createLevel(levelNum);
}

function introZoom(frameTime) {
    let zoomDuration = 5;
    if (introZoomProgress < zoomDuration) {
        introZoomProgress += frameTime / 1000;
        if (introZoomProgress > 0) {
            updateZoom(startingZoom + (finalZoom - startingZoom) * (-2 * Math.cos(14.14 * Math.pow(introZoomProgress / zoomDuration, 3)) / (8.5 * Math.pow(introZoomProgress / zoomDuration + 0.7, 6) + 1) + 1));
        }
    } else if (introZoomProgress < zoomDuration + 100) {
        updateZoom(finalZoom);
        gameStarted = true;
        introZoomProgress = zoomDuration + 100;
    }
}

var svg = d3.select("body")
    .append("svg")
    .attr("width", gameWidth)
    .attr("height", gameHeight);

// Key Event listeners
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
        case " ":
            console.log("space");
            space = true;
            break;
        case "Down": // IE/Edge specific value
        case "ArrowDown":
        case "s":
            console.log("down");
            down = true;
            break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
        case "w":
            console.log("up");
            up = true;
            break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
        case "a":
            console.log("left");
            left = true;
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
        case "d":
            console.log("right");
            right = true;
            break;
        case "Shift":
            console.log("shift");
            shift = true;
            break;
        case "Enter":
            console.log("enter");
            enter = true;
            break;
        case "Esc": // IE/Edge specific value
        case "Escape":
            console.log("escape");
            esc = true;
            drawLevelEditorGrid(true);
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
        case " ":
            console.log("space");
            space = false;
            break;
        case "Down": // IE/Edge specific value
        case "ArrowDown":
        case "s":
            console.log("down");
            down = false;
            break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
        case "w":
            console.log("up");
            up = false;
            break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
        case "a":
            console.log("left");
            left = false;
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
        case "d":
            console.log("right");
            right = false;
            break;
        case "Shift":
            console.log("shift");
            shift = false;
            break;
        case "Enter":
            console.log("enter");
            enter = false;
            break;
        case "Esc": // IE/Edge specific value
        case "Escape":
            console.log("escape");
            esc = false;
            drawLevelEditorGrid(false);
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

$("html").mousedown(function() {
    click = true;
    if (!deviceOrientationGranted) {
        DeviceMotionEvent.requestPermission().then(response => {
            if (response == "granted") {
                // Add a listener to get smartphone orientation in the alpha-beta-gamma axes (units in degrees)
                window.addEventListener("deviceorientation", (event) => {
                    // Expose each orientation angle in a more readable way
                    alpha = event.alpha;
                    beta = event.beta;
                    gamma = event.gamma;
                });
                deviceOrientationGranted = true;
            }
        });
    }
});