const mobile = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent) || /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(navigator.userAgent);
const width = window.innerWidth;
const height = window.innerHeight;
var started = false;
var muted = true;

var streetTimes = [10, 15, 20, 25, 30];
var timeLeft = 0;
var prevTimeLeft = 0;
var street = 0;
var timeBankPressed = false;
var timeBanksUsed = 0;

var unit = width / 37;
var bWidth = unit * 8;
var bHeight = unit * 4;
var textSize = unit * 2.5;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height - unit * 2 - 16)
    .attr("y", unit)

function clickButton(s, id) {
    if (s === 4) {
        timeBanksUsed++;
        timeLeft += streetTimes[s];
        timeBankPressed = true;
        let color = timeBanksUsed === 1 ? "#666" : timeBanksUsed === 2 ? "#999" : timeBanksUsed === 3 ? "#ccc" : "#fff"; 
        d3.select("#" + id + "Button").style("fill", color);
    } else {
        street = s;
        timeBankPressed = false;
        d3.selectAll(".button").style("fill", "#333");
        d3.select("#" + id + "Button").style("fill", "#666");
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
        .style("font-size", (unit * 0.9) + "px")
        .attr("value", streetTimes[s]);
    document.getElementById(id).addEventListener("input", (e) => {streetTimes[s] = parseFloat(e.target.value);});
    svg.append("rect")
        .attr("id", id + "Button")
        .attr("class", "button")
        .attr("width", bWidth)
        .attr("height", bHeight)
        .attr("x", x)
        .attr("y", y)
        .on("click", () => clickButton(s, id));
    document.getElementById(id + "Button").addEventListener("touchstart", () => {clickButton(s, id)});
    svg.append("text")
        .attr("id", id + "Text")
        .attr("class", "text")
        .attr("x", x + bWidth / 2)
        .attr("y", y + bHeight / 2 + textSize / 3)
        .attr("font-size", textSize)
        .text(text)
        .on("click", () => clickButton(s, id));
    document.getElementById(id + "Text").addEventListener("touchstart", () => {clickButton(s, id)});
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
    .text("Start");

var latestTap;
var startTouchX;
var startTouchY;
document.getElementById("html").addEventListener("touchstart", reset);
document.getElementById("html").addEventListener("touchmove", swipe);
function getTouches(evt) {
    return evt.touches ||          // browser API
        evt.originalEvent.touches; // jQuery
}                
function swipe(evt) {
    if (!xDown || !yDown) {
        return;
    }
    if (Math.sqrt(Math.pow(startTouchX - evt.touches[0].clientX, 2) + Math.pow(startTouchY - evt.touches[0].clientY, 2)) > 400) {
        restart();
    }
    startTouchX = null;
    startTouchY = null;
}

function restart() {
    timeLeft = 0;
    started = false;
}

function reset(evt=null) {
    if (evt) {
        const firstTouch = getTouches(evt)[0];                                      
        startTouchX = firstTouch.clientX;                                      
        startTouchY = firstTouch.clientY;
    }
    started = true;
    // Test for double tap
    if (!mobile) {
        var now = new Date().getTime();
        var timeSince = now - latestTap;
        if (timeSince < 300) {
            restart();
        }
        latestTap = new Date().getTime();
    }
    if (!timeBankPressed) {
        timeLeft = streetTimes[street];
        timeBanksUsed = 0;
        d3.select("#TimeBankButton").style("fill", "#333");
    }
    timeBankPressed = false;
    Tone.loaded().then(() => {
        const now = Tone.now()
        sampler.triggerAttackRelease("C4", 0, now, 0);
        Tone.context.resume();
        console.log(Tone.context.state);
        // For devices/browsers that start the audiocontext in suspended mode, this prompts the user to unmute sound.
        if (Tone.context.state !== "running" && muted) {
            d3.select("unmute")
                .attr("width", width)
                .attr("height", height)
            $("#unmute").show();
            document.querySelector("#unmute").addEventListener("click", function() {
                Tone.context.resume().then(() => {
                    $("#unmute").hide();
                    muted = false;
                });
            });
        }
    });
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
            updateText();
            timeLeft -= frameTime / 1000;
            d3.select("body").style("background", "hsl(" + 120 * timeLeft / streetTimes[street] + ", 100%, 33%)");
        } else {
            timeLeft = 0;
            updateText();
            d3.select("body").style("background", "black");
        }
        for (let i = 0; i <= 3; i++) {
            if (prevTimeLeft > i && timeLeft <= i) {
                Tone.loaded().then(() => {
                    sampler.triggerAttackRelease(i === 0 ? "C5" : "G4", 1);
                });
            }
        }
        prevTimeLeft = timeLeft;
    }
    if (!started) {
        d3.select("body").style("background", "black");
        mainText.text("Start");
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