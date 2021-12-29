var startingZoom = 5;
var finalZoom = 0.5;
var zoom = startingZoom;
var introZoomProgress = -1;
var bluRad = 32 * zoom;
var bluSize = 2 * bluRad;
var gameWidth = 32 * 40;
var gameHeight = 32 * 22;
var bluStartingX = bluSize;
var bluStartingY = bluSize * 1.5;
var bluX = bluStartingX;
var bluY = bluStartingY;
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
var z = false;
var x = false;
var click = false;
var deviceOrientationGranted = false;
var levelNum = 1;
var gameStarted = false;
var alpha = 0;
var beta = 0;
var gamma = 0;

var svg = d3.select("body")
    .append("svg")
    .attr("width", gameWidth)
    .attr("height", gameHeight)
    .style("position", "absolute");

var mobile = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent) || /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(navigator.userAgent);
if (mobile) {
    d3.select("body")
        .append("button")
        .attr("id", "deviceOrientationButton")
        .attr("onclick", "requestDeviceOrientation()")
        .html("Access Device Orientation")
        .style("float", "left")
        .style("position", "absolute");
}


if (mobile) {
    if (window.innerHeight / gameWidth < window.innerWidth / gameHeight) {
        svg.style("transform", "scale(" + window.innerHeight / gameWidth + ")");
    } else {
        svg.style("transform", "scale(" + window.innerWidth / gameHeight+ ")");
    }
} else {
    if (window.innerWidth / gameWidth < window.innerHeight / gameHeight) {
        svg.style("transform", "scale(" + window.innerWidth / gameWidth + ")");
    } else {
        svg.style("transform", "scale(" + window.innerHeight / gameHeight+ ")");
    }
}
svg.style("transform-origin", "top left");

function flipY(y) {
    return gameHeight - y;
}

function updateZoom(z, level = true) {
    let ratio = z / zoom;
    zoom = z;
    bluRad = 32 * zoom;
    bluSize = 2 * bluRad;
    bluStartingX *= ratio;
    bluStartingY *= ratio;
    bluX *= ratio;
    bluY *= ratio;
    bluRX *= ratio;
    bluRY *= ratio;
    bluJumpPower = bluJumpPowerDefault * zoom;
    bluSpeed = bluSpeedDefault * zoom;
    gravity = zoom;
    if (level) createLevel(levelNum);
}

function introZoom(frameTime) {
    let zoomDuration = 3;
    let buffer = 999;
    let fadeDuration = 1.5;
    if (introZoomProgress < zoomDuration) {
        introZoomProgress += frameTime / 1000;
        if (introZoomProgress > 0) {
            updateZoom(startingZoom + (finalZoom - startingZoom) * 1.0135673 * (1 / (1 + Math.pow(Math.E, -10 * (introZoomProgress / zoomDuration - 0.5))) - 0.00669285), false);
        }
    } else if (introZoomProgress < zoomDuration + buffer) {
        updateZoom(finalZoom);
        gameStarted = true;
        introZoomProgress = zoomDuration + buffer;
    } else if (introZoomProgress < zoomDuration + buffer + fadeDuration) {
        introZoomProgress += frameTime / 1000;
        updateLevelOpacity((introZoomProgress - zoomDuration - buffer) / fadeDuration);
    } else {
        updateLevelOpacity(1);
    }
}

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
        case "Esc": // IE/Edge specific value
        case "Escape":
            console.log("escape");
            esc = true;
            drawLevelEditorGrid(true);
            break;
        case "z":
            console.log("z");
            z = true;
            break;
        case "x":
            console.log("x");
            x = true;
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
            space = false;
            break;
        case "Down": // IE/Edge specific value
        case "ArrowDown":
        case "s":
            down = false;
            break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
        case "w":
            up = false;
            break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
        case "a":
            left = false;
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
        case "d":
            right = false;
            break;
        case "Shift":
            shift = false;
            break;
        case "Esc": // IE/Edge specific value
        case "Escape":
            esc = false;
            drawLevelEditorGrid(false);
            break;
        case "z":
            z = false;
            break;
        case "x":
            x = false;
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

var latestTap;
function mobileTap() {
    click = true;
    // Test for double tap
    var now = new Date().getTime();
    var timeSince = now - latestTap;
    if ((timeSince < 300) && (timeSince > 100)) {
        if (zoom < 4) {
            updateZoom(zoom * 2);
        } else {
            updateZoom(0.5);
        }
    }
    latestTap = new Date().getTime();
}

document.getElementById("html").addEventListener("touchstart", mobileTap);

function requestDeviceOrientation() {
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
                d3.select("#deviceOrientationButton").remove();
            }
        });
    }
}