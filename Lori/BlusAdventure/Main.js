var bluX = 400;
var bluY = 400;
var bluSize = 50;
var bluRX = bluSize;
var bluRY = bluSize;

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
    .attr("height", 200)
    .attr("x", 0)
    .attr("y", flipY(200));

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
            console.log("down");
            break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
            console.log("up");
            break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
            console.log("left");
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
            console.log("right");
            break;
        case "Enter":
            console.log("enter");
            break;
        case "Esc": // IE/Edge specific value
        case "Escape":
            console.log("escape");
            break;
        case " ":
            console.log("space");
            start = undefined;
            window.requestAnimationFrame(bounce);
        default:
            return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);