const width = window.innerWidth;
const height = window.innerHeight;
var started = false;
var streetTimes = [10, 15, 20, 25, 30];
var timeLeft = 0;
var prevTimeLeft = 0;
var street = 0;
var timeBankPressed = false;

var unit = width / 37;
var bWidth = unit * 8;
var bHeight = unit * 4;
var textSize = unit * 2.5;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height - unit * 2 - 16)
    .attr("y", unit)

function clickButton(s) {
    if (s === 4) {
        timeLeft += streetTimes[s];
        timeBankPressed = true;
    } else {
        street = s;
        timeBankPressed = false;
    }
}

function buildButton(s, text, bWidth, bHeight, x, y) {
    var id = text.replace(/ /g, "");
    d3.select("body").append("input")
        .attr("id", id)
        .attr("class", "input")
        .style("width", bWidth + "px")
        .style("height", unit + "px")
        .style("margin-left", unit + "px")
        .style("font-size", unit + "px")
        .attr("value", streetTimes[s]);
    document.getElementById(id).addEventListener("input", (e) => {streetTimes[s] = parseFloat(e.target.value);});
    svg.append("rect")
        .attr("class", "button")
        .attr("width", bWidth)
        .attr("height", bHeight)
        .attr("x", x)
        .attr("y", y)
        .on("click", () => clickButton(s));
    svg.append("text")
        .attr("class", "text")
        .attr("x", x + bWidth / 2)
        .attr("y", y + bHeight / 2 + textSize / 3)
        .attr("font-size", textSize)
        .text(text)
        .on("click", () => clickButton(s));
}
buildButton(0, "Preflop", bWidth, bHeight, unit, 0);
buildButton(1, "Flop", bWidth, bHeight, unit * 10, 0);
buildButton(2, "Turn", bWidth, bHeight, unit * 19, 0);
buildButton(3, "River", bWidth, bHeight, unit * 28, 0);
buildButton(4, "Time Bank", unit * 35, bHeight, unit, height - unit * 2 - bHeight - 16);
$("svg").each(function() {
    $(this).insertAfter($(this).parent().find("#River"));
});
var mainText = svg.append("text")
    .attr("class", "text")
    .attr("x", width / 2)
    .attr("y", height / 2 + width / 16)
    .attr("font-size", width > height * 5/3 ? width / 4 : width / 3)
    .text("Start")

function reset() {
    started = true;
    if (!timeBankPressed) {
        timeLeft = streetTimes[street];
    }
    timeBankPressed = false;
    updateText();
}

function updateText() {
    mainText.text((Math.round(timeLeft * 100) / 100).toFixed(2));
}

let timerStart, timerPreviousTimeStamp;
// Current timestamp is passed in by window.requestAnimationFrame()
function timer(timestamp) {
    if (timerStart === undefined)
        timerStart = timestamp;
    const elapsed = timestamp - timerStart;
    const frameTime = timestamp - timerPreviousTimeStamp;

    if (timerPreviousTimeStamp !== undefined && started) {
        if (timeLeft > 0) {
            timeLeft -= frameTime / 1000;
            updateText();
        } else {
            timeLeft = 0;
            updateText();
        }
        d3.select("body").style("background", "hsl(" + 120 * timeLeft / streetTimes[street] + ", 100%, 50%)");
        for (let i = 0; i <= 3; i++) {
            if (prevTimeLeft > i && timeLeft <= i) {
                Tone.loaded().then(() => {
                    sampler.triggerAttackRelease(i === 0 ? "C5" : "G4", 1);
                });
            }
        }
        prevTimeLeft = timeLeft;
    }
    timerPreviousTimeStamp = timestamp;
    window.requestAnimationFrame(timer);
}

window.requestAnimationFrame(timer);

const sampler = new Tone.Sampler({
    urls: {
        "A0": "A0.mp3",
        "C1": "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        "A1": "A1.mp3",
        "C2": "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        "A2": "A2.mp3",
        "C3": "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        "A3": "A3.mp3",
        "C4": "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        "A4": "A4.mp3",
        "C5": "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        "A5": "A5.mp3",
        "C6": "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        "A6": "A6.mp3",
        "C7": "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        "A7": "A7.mp3",
        "C8": "C8.mp3"
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();