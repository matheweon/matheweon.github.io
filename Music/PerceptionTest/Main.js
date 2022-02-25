const tabNamesArray = ["pitchTest", "rhythmTest"];
var selectedTab = 0;
for (tab of tabNamesArray) {
    if (tab !== tabNamesArray[0]) {
        $("#" + tab).hide();
    }
}
const slideDistance = window.innerWidth * 2
const slideSpeed = 750;
var scores = [
    [0, 0, 0, [0, 0], [0, 0], [0, 0], [0, 0]],
    [0, 0, 0, [0, 0], [0, 0], [0, 0], [0, 0]]
];

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

function selectTab(direction) {
    document.body.style.backgroundColor = "black";
    if (direction === "left") {
        selectedTab += tabNamesArray.length - 1;
        selectedTab %= tabNamesArray.length;
        for (let i = 0; i < tabNamesArray.length; i++) {
            if (selectedTab === i) {
                $("#" + tabNamesArray[i]).show("slide", {direction: "left", distance: slideDistance}, slideSpeed);
            } else {
                $("#" + tabNamesArray[i]).hide("slide", {direction: "right", distance: slideDistance}, slideSpeed);
            }
        }
    } else {
        selectedTab++;
        selectedTab %= tabNamesArray.length;
        for (let i = 0; i < tabNamesArray.length; i++) {
            if (selectedTab === i) {
                $("#" + tabNamesArray[i]).show("slide", {direction: "right", distance: slideDistance}, slideSpeed);
            } else {
                $("#" + tabNamesArray[i]).hide("slide", {direction: "left", distance: slideDistance}, slideSpeed);
            }
        }
    }
}

document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        // "SPACE"
        case 32:
            event.preventDefault();
            play()
            break;
        // "LEFT ARROW"
        case 37: selectTab("left"); break;
        // "RIGHT ARROW"
        case 39: selectTab("right"); break;
    }
});

$(document).on("click", function (event) {
    play()
});
$("button").on("click", function (event) {
    event.stopPropagation();
});

function play() {
    if (selectedTab === 0) {
        pitchTest();
    } else if (selectedTab === 1) {
        rhythmTest();
    }
}

function updateScores() {
    for (let i = 0; i < scores.length; i++) {
        if (scores[i][1] > scores[i][2]) {
            scores[i][2] = scores[i][1];
        }
    }
    d3.select("#scoreText").html("<b>Total</b>: " + scores[selectedTab][0] + "<br><b>Score</b>: " + scores[selectedTab][1] + "<br><b>High Score</b>: " + scores[selectedTab][2] + "<br><b>Difficulty 1</b>: " + scores[selectedTab][3][0] + " / " + scores[selectedTab][3][1] + "<br><b>Difficulty 2</b>: " + scores[selectedTab][4][0] + " / " + scores[selectedTab][4][1] + "<br><b>Difficulty 3</b>: " + scores[selectedTab][5][0] + " / " + scores[selectedTab][5][1] + "<br><b>Difficulty 4</b>: " + scores[selectedTab][6][0] + " / " + scores[selectedTab][6][1])
}