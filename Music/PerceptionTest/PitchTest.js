var a = 110
var offsets = [50, 25, 10, 5]
var offset = 0
var freq1 = 440
var freq2 = 440
var interval = 0
var dir = 0
var tempo = 0.5
var pitchPlayed = false

function pitchTest() {
    if (offset === 0) {
        newPitches()
    }
    pitchPlayed = true
    displayCents(true)
    Tone.loaded().then(() => {
        let now = Tone.now()
        sampler.triggerAttackRelease(freq1, 1);
        sampler.triggerAttackRelease(freq1 * interval, 1, now + tempo);
        sampler.triggerAttackRelease(freq2, 1, now + tempo * 3);
        sampler.triggerAttackRelease(freq2 * interval * Math.pow(2, offset / 1200 * dir), 1, now + tempo * 4);
    });
    d3.selectAll(".pitch").attr("class", "pitch")
}

function guessPitch(guess) {
    if (pitchPlayed) {
        scores[0][0]++
        scores[0][difficulty + 3][1]++
        if (guess === dir) {
            scores[0][1] += 1
            d3.select("#pitch" + (dir + 1)).attr("class", "pitch correct")
            scores[0][difficulty + 3][0]++
        } else {
            scores[0][1] = 0
            d3.select("#pitch" + (dir + 1)).attr("class", "pitch correct")
            d3.select("#pitch" + (guess + 1)).attr("class", "pitch incorrect")
        }
        updateScores()
        if (dir === 0) {
            displayCents(false, true)
        } else {
            displayCents()
        }
        newPitches()
    } else {
        console.log("Press space or click to listen")
    }
}

function newPitches() {
    pitchPlayed = false
    difficulty = Math.floor(Math.random() * offsets.length)
    offset = offsets[difficulty]
    freq1 = Math.pow(2, 1 + Math.random()) * a
    freq2 = Math.pow(2, 1 + Math.random()) * a
    interval = Math.pow(2, 1 + Math.floor(Math.random() * 25 - 12) / 12)
    dir = Math.floor(Math.random() * 3 - 1)
}

function displayCents(hide = false, same = false) {
    if (hide) {
        d3.select("#cents").html("")
    } else if (same) {
        d3.select("#cents").html("Potential Cents: " + offset)
    } else {
        d3.select("#cents").html("Cents: " + offset)
    }
}