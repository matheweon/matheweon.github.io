var svg = d3.select("#singleNoteTraining")
    .append("svg")
    .attr("width", keyWidth * 7)
    .attr("height", keyWidth * 5);

function playNote() {
    let oldNote = currentNote;
    while (currentNote === oldNote) {
        currentNote += Math.floor(Math.random() * 25 - 12);
        if (currentNote <= middleNote - 18) {
            currentNote += 12;
        } else if (currentNote >= middleNote + 18) {
            currentNote -= 12;
        }
    }
    if (firstNote) {
        firstNote = false;
        selectNote(indexToNote(currentNote, true));
    } else {
        Tone.loaded().then(() => {
            sampler.triggerAttackRelease(indexToNote(currentNote), 1);
        });
    }
}

function revealNote() {
    document.getElementById("noteText").innerHTML = indexToNote(currentNote);
}

function hideNote() {
    document.getElementById("noteText").innerHTML = "";
}

function selectNote(note) {
    if (!firstNote) {
        revealNote();
        deselectKeys();
        guessNote(note);
        Tone.loaded().then(() => {
            let noteMIDI = notes.indexOf(note);
            while (Math.abs(currentNote - noteMIDI) > 6) {
                noteMIDI += 12;
            }
            sampler.triggerAttackRelease(indexToNote(noteMIDI), 1);
        });
    }
}

function guessNote(note) {
    if (note === indexToNote(currentNote, true)) {
        selectedNotes[note] = "correctlySelected";
    } else {
        selectedNotes[note] = "incorrect";
        selectedNotes[indexToNote(currentNote, true)] = "correct";
    }
    drawPiano();
}

function deselectKeys() {
    for (let i = 0; i < 12; i++) {
        selectedNotes[notes[i]] = "";
    }
}

/*function holdingShift(shift) {
    if (shift) {
        notes.forEach(function(currentValue, index) {document.getElementById(currentValue).innerHTML = noteKeys[index]});
    } else {
        notes.forEach(function(currentValue, index) {document.getElementById(currentValue).innerHTML = notes[index]});
    }
}*/

document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        // "SPACE"
        case 32: playNote(); event.preventDefault(); break;
        // "SHIFT"
        case 16: holdingShift(true); break;
        case 65: selectNote("C"); break;
        case 87: selectNote("Db"); break;
        case 83: selectNote("D"); break;
        case 69: selectNote("Eb"); break;
        case 68: selectNote("E"); break;
        case 70: selectNote("F"); break;
        case 84: selectNote("Gb"); break;
        case 71: selectNote("G"); break;
        case 89: selectNote("Ab"); break;
        case 72: selectNote("A"); break;
        case 85: selectNote("Bb"); break;
        case 74: selectNote("B"); break;
        // "1"
        case 49: selectPage("singleNoteTraining"); break;
        // "2"
        case 50: selectPage("intervalTraining"); break;
        // "R"
        case 82: firstNote = true; playNote(); break;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.keyCode === 16) {
        holdingShift(false);
    }
});

function drawKey(x, y, width, height, fill) {
    svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", fill)
        .attr("stroke", "black")
        .attr("stroke-width", keyWidth / 18);
}

function drawKeyText(x, y, text, blackKey) {
    svg.append("text")
        .attr("x", x)
        .attr("y", y)
        .style("font-size", keyWidth * 0.4)
        .style("fill", blackKey ? "white" : "black")
        .style("text-anchor", "middle")
        .text(text);
}

function drawPiano() {
    drawKey(0, 0, keyWidth, keyWidth * 5, getColor("C"));
    drawKey(keyWidth, 0, keyWidth, keyWidth * 5, getColor("D"));
    drawKey(keyWidth * 2, 0, keyWidth, keyWidth * 5, getColor("E"));
    drawKey(keyWidth * 3, 0, keyWidth, keyWidth * 5, getColor("F"));
    drawKey(keyWidth * 4, 0, keyWidth, keyWidth * 5, getColor("G"));
    drawKey(keyWidth * 5, 0, keyWidth, keyWidth * 5, getColor("A"));
    drawKey(keyWidth * 6, 0, keyWidth, keyWidth * 5, getColor("B"));
    drawKey(keyWidth * 15/24, 0, keyWidth * 14/24, keyWidth * 3, getColor("Db", true));
    drawKey(keyWidth * 43/24, 0, keyWidth * 14/24, keyWidth * 3, getColor("Eb", true));
    drawKey(keyWidth * 85/24, 0, keyWidth * 14/24, keyWidth * 3, getColor("Gb", true));
    drawKey(keyWidth * 113/24, 0, keyWidth * 14/24, keyWidth * 3, getColor("Ab", true));
    drawKey(keyWidth * 141/24, 0, keyWidth * 14/24, keyWidth * 3, getColor("Bb", true));
    drawKeyText(keyWidth * 0.5, keyWidth * 4.5, "A");
    drawKeyText(keyWidth * 1.5, keyWidth * 4.5, "S");
    drawKeyText(keyWidth * 2.5, keyWidth * 4.5, "D");
    drawKeyText(keyWidth * 3.5, keyWidth * 4.5, "F");
    drawKeyText(keyWidth * 4.5, keyWidth * 4.5, "G");
    drawKeyText(keyWidth * 5.5, keyWidth * 4.5, "H");
    drawKeyText(keyWidth * 6.5, keyWidth * 4.5, "J");
    drawKeyText(keyWidth * 22/24, keyWidth * 2.8, "W", true);
    drawKeyText(keyWidth * 50/24, keyWidth * 2.8, "E", true);
    drawKeyText(keyWidth * 92/24, keyWidth * 2.8, "T", true);
    drawKeyText(keyWidth * 120/24, keyWidth * 2.8, "Y", true);
    drawKeyText(keyWidth * 148/24, keyWidth * 2.8, "U", true);
}

function getColor(note, blackKey) {
    if (selectedNotes[note] === "correctlySelected") {
        return "green";
    } else if (selectedNotes[note] === "correct") {
        return "yellowgreen";
    } else if (selectedNotes[note] === "incorrect") {
        return "red";
    } else if (blackKey) {
        return "#131313";
    } else {
        return "white";
    }
}

drawPiano();