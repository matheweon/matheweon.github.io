var ratio = 2;
var bluRad = 32 * ratio;
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

function flipY(y) {
    return gameHeight - y;
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