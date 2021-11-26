const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const noteKeys = ["A", "W", "S", "E", "D", "F", "T", "G", "Y", "H", "U", "J"];
const middleNote = 54;
var currentNote = middleNote;
var firstNote = true;
var selectedNotes = {};
const keyWidth = 24 * 4;
var displayKeyboardKeys = true;
const tabs = ["singleNoteTraining", "intervalTraining", "melodyTraining"];
var selectedTab = 0;
$("#intervalTraining").hide();
$("#melodyTraining").hide();
const slideDistance = window.innerWidth * 2
const slideSpeed = 750;

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

function indexToNote(index, truncate) {
    if (truncate) {
        return truncateNote(notes[index % 12] + parseInt(index / 12));
    }
    return notes[index % 12] + parseInt(index / 12);
}

function truncateNote(note) {
    return note.slice(0, -1);
}

function selectTab(direction) {
    if (direction === "left") {
        selectedTab--;
        if (selectedTab < 0) {
            selectedTab = tabs.length - 1;
        }
        for (let i = 0; i < tabs.length; i++) {
            if (selectedTab === i) {
                $("#" + tabs[i]).show("slide", {direction: "left", distance: slideDistance}, slideSpeed);
            } else {
                $("#" + tabs[i]).hide("slide", {direction: "right", distance: slideDistance}, slideSpeed);
            }
        }
    } else {
        selectedTab++;
        if (selectedTab >= tabs.length) {
            selectedTab = 0;
        }
        for (let i = 0; i < tabs.length; i++) {
            if (selectedTab === i) {
                $("#" + tabs[i]).show("slide", {direction: "right", distance: slideDistance}, slideSpeed);
            } else {
                $("#" + tabs[i]).hide("slide", {direction: "left", distance: slideDistance}, slideSpeed);
            }
        }
    }
}