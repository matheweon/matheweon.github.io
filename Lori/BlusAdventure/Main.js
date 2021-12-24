var bluRadius = 32;
var bluSize = 2 * bluRadius;
var bluX = bluSize;
var bluY = bluSize * 1.5;
var bluRX = bluRadius;
var bluRY = bluRadius;
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
    .attr("width", window.innerWidth)
    .attr("height", bluSize)
    .attr("x", 0)
    .attr("y", flipY(bluSize));

var block1 = svg.append("rect")
    .attr("class", "wall")
    .style("fill", "black")
    .attr("width", bluSize)
    .attr("height", bluSize)
    .attr("x", bluSize * 2)
    .attr("y", flipY(bluSize * 2));

var block2 = svg.append("rect")
    .attr("class", "wall")
    .style("fill", "black")
    .attr("width", bluSize)
    .attr("height", bluSize)
    .attr("x", bluSize * 4)
    .attr("y", flipY(bluSize * 3));
    
var block3 = svg.append("rect")
    .attr("class", "wall")
    .style("fill", "black")
    .attr("width", bluSize)
    .attr("height", bluSize)
    .attr("x", bluSize * 6)
    .attr("y", flipY(bluSize * 4));
    
var block4 = svg.append("rect")
    .attr("class", "wall")
    .style("fill", "black")
    .attr("width", bluSize)
    .attr("height", bluSize)
    .attr("x", bluSize * 8)
    .attr("y", flipY(bluSize * 5));

var block5 = svg.append("rect")
    .attr("class", "wall")
    .style("fill", "black")
    .attr("width", bluSize)
    .attr("height", bluSize)
    .attr("x", bluSize * 10)
    .attr("y", flipY(bluSize * 6));

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