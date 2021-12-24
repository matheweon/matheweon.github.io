var bluX = 400;
var bluY = 400;
var bluSize = 50;
var bluRX = bluSize;
var bluRY = bluSize;
var up = false;
var down = false;
var left = false;
var right = false;
var space = false;

function flipY(y) {
    return window.innerHeight - y;
}

var svg = d3.select("body")
    .append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

var ground = svg.append("rect")
    .attr("class", "wall")
    .style("fill", "black")
    .attr("width", 300)
    .attr("height", 200)
    .attr("x", 0)
    .attr("y", flipY(200));

var block = svg.append("rect")
    .attr("class", "wall")
    .style("fill", "black")
    .attr("width", 100)
    .attr("height", 100)
    .attr("x", 100)
    .attr("y", flipY(600));

var block = svg.append("rect")
    .attr("class", "wall")
    .style("fill", "black")
    .attr("width", 100)
    .attr("height", 100)
    .attr("x", 0)
    .attr("y", flipY(400));

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
        case "Enter":
            console.log("enter");
            break;
        case "Esc": // IE/Edge specific value
        case "Escape":
            console.log("escape");
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
        case "Enter":
            console.log("enter");
            break;
        case "Esc": // IE/Edge specific value
        case "Escape":
            console.log("escape");
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);