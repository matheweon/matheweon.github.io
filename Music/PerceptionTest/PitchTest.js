var a = 110
var pitchTempo = 0.5
var pitchOffsets = [50, 25, 10, 5]
var pitchOffset = 0
var pitchDir = 0
var freq1 = 440
var freq2 = 440
var interval = 0
var pitchPlayed = false

function pitchTest() {
    if (pitchOffset === 0) {
        newPitches()
    }
    pitchPlayed = true
    displayCents(true)
    Tone.loaded().then(() => {
        let now = Tone.now()
        sampler.triggerAttackRelease(freq1, 1)
        sampler.triggerAttackRelease(freq1 * interval, 1, now + pitchTempo)
        sampler.triggerAttackRelease(freq2, 1, now + pitchTempo * 3)
        sampler.triggerAttackRelease(freq2 * interval * Math.pow(2, pitchOffset / 1200 * pitchDir), 1, now + pitchTempo * 4)
    })
    d3.selectAll(".pitch").attr("class", "pitch")
}

function newPitches() {
    pitchPlayed = false
    setDifficulty()
    pitchOffset = pitchOffsets[difficulty]
    pitchDir = Math.floor(Math.random() * 3 - 1)
    freq1 = Math.pow(2, 1 + Math.random()) * a
    freq2 = Math.pow(2, 1 + Math.random()) * a
    interval = Math.pow(2, 1 + Math.floor(Math.random() * 25 - 12) / 12)
}

function guessPitch(guess) {
    if (pitchPlayed) {
        scores[0][0]++
        scores[0][difficulty + 3][1]++
        if (guess === pitchDir) {
            scores[0][1] += 1
            d3.select("#pitch" + (pitchDir + 1)).attr("class", "pitch correctlySelected")
            scores[0][difficulty + 3][0]++
        } else {
            scores[0][1] = 0
            d3.select("#pitch" + (pitchDir + 1)).attr("class", "pitch correct")
            d3.select("#pitch" + (guess + 1)).attr("class", "pitch incorrect")
        }
        updateScores()
        if (pitchDir === 0) {
            displayCents(false, true)
        } else {
            displayCents()
        }
        newPitches()
    } else {
        d3.select("#cents").html("Press space or click anywhere that's not a button to listen")
    }
}

function displayCents(hide = false, same = false) {
    if (hide) {
        d3.select("#cents").html("")
    } else if (same) {
        d3.select("#cents").html("Potential Cents: " + pitchOffset)
    } else {
        d3.select("#cents").html("Cents: " + pitchOffset)
    }
}