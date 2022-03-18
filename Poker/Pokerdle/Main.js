// TODO:
// animations
// - reveal suits
// - invalid word shake
// help (?) button
// - instructions
// - shows all poker words
// daily word

const pokerWords = [
    "added",
    "addon",
    "aggro",
    "allin",
    "angle",
    "antes",
    "backs",
    "balls",
    "bands",
    "banks",
    "beats",
    "begin",
    "belly",
    "bends",
    "benji",
    "bills",
    "binks",
    "black",
    "blank",
    "blast",
    "bleed",
    "blind",
    "block",
    "bluff",
    "board",
    "boats",
    "bombs",
    "brain",
    "break",
    "brick",
    "bring",
    "broke",
    "bucks",
    "bully",
    "burns",
    "burnt",
    "busto",
    "busts",
    "buyer",
    "buyin",
    "calls",
    "cards",
    "catch",
    "cbets",
    "cents",
    "champ",
    "chase",
    "cheat",
    "check",
    "chips",
    "chops",
    "chunk",
    "clean",
    "click",
    "climb",
    "clock",
    "clubs",
    "color",
    "combo",
    "cools",
    "count",
    "crabs",
    "crack",
    "deals",
    "dealt",
    "death",
    "degen",
    "delay",
    "depth",
    "deuce",
    "dimes",
    "dirty",
    "dnegs",
    "donks",
    "doyle",
    "drawn",
    "draws",
    "drawy",
    "drown",
    "ducks",
    "early",
    "eight",
    "enter",
    "error",
    "event",
    "exits",
    "faced",
    "faces",
    "favor",
    "felts",
    "field",
    "fifth",
    "fifty",
    "fight",
    "fills",
    "final",
    "fired",
    "fires",
    "first",
    "fishy",
    "fives",
    "flake",
    "flash",
    "flats",
    "flips",
    "float",
    "flops",
    "flush",
    "focus",
    "folds",
    "force",
    "fours",
    "freer",
    "front",
    "funds",
    "games",
    "giant",
    "gifts",
    "grabs",
    "grand",
    "greed",
    "greek",
    "green",
    "grind",
    "gypsy",
    "hands",
    "heads",
    "heart",
    "heats",
    "heavy",
    "hides",
    "highs",
    "holes",
    "hooks",
    "horse",
    "hosts",
    "house",
    "hundo",
    "hunts",
    "idiot",
    "image",
    "imply",
    "jacks",
    "joker",
    "kicks",
    "kills",
    "kings",
    "lasts",
    "later",
    "leads",
    "leaks",
    "least",
    "leave",
    "legal",
    "level",
    "light",
    "limit",
    "limps",
    "lines",
    "loads",
    "locks",
    "lodge",
    "looks",
    "loose",
    "loser",
    "loses",
    "lower",
    "lucky",
    "lying",
    "match",
    "merge",
    "micro",
    "minus",
    "mixed",
    "money",
    "moves",
    "mucks",
    "multi",
    "night",
    "nines",
    "nitty",
    "north",
    "nutty",
    "ocean",
    "omaha",
    "opens",
    "orbit",
    "outer",
    "overs",
    "paint",
    "pairs",
    "payer",
    "penny",
    "plays",
    "plohi",
    "poker",
    "polar",
    "posts",
    "prays",
    "preys",
    "prize",
    "probe",
    "props",
    "pulls",
    "punts",
    "purse",
    "quads",
    "queen",
    "quick",
    "quits",
    "races",
    "racks",
    "rails",
    "raise",
    "rakes",
    "range",
    "ranks",
    "rates",
    "ratio",
    "reads",
    "rebuy",
    "repop",
    "rhode",
    "right",
    "rings",
    "river",
    "rocks",
    "rolls",
    "rooms",
    "round",
    "royal",
    "rules",
    "saves",
    "scams",
    "scare",
    "scoop",
    "sells",
    "sense",
    "setup",
    "seven",
    "shark",
    "shill",
    "short",
    "shots",
    "shove",
    "shows",
    "sixes",
    "sixty",
    "skill",
    "sleep",
    "slick",
    "slows",
    "small",
    "snaps",
    "solve",
    "south",
    "space",
    "spade",
    "speak",
    "speed",
    "spend",
    "spent",
    "spike",
    "spins",
    "split",
    "sport",
    "stabs",
    "stack",
    "stake",
    "stand",
    "stare",
    "stars",
    "start",
    "stays",
    "steal",
    "steam",
    "steel",
    "stick",
    "stole",
    "stone",
    "stuck",
    "studs",
    "study",
    "sucks",
    "suits",
    "super",
    "sweat",
    "sweet",
    "swing",
    "table",
    "taint",
    "takes",
    "tanks",
    "tells",
    "texas",
    "thick",
    "think",
    "thins",
    "third",
    "three",
    "throw",
    "tight",
    "tilts",
    "timer",
    "times",
    "token",
    "tough",
    "traps",
    "trash",
    "treys",
    "trick",
    "trips",
    "turbo",
    "turns",
    "twice",
    "twist",
    "under",
    "value",
    "vegas",
    "venmo",
    "verse",
    "waits",
    "wakes",
    "walks",
    "weeds",
    "whale",
    "wheel",
    "white",
    "widen",
    "witty",
    "wraps",
    "yacht",
    "zeros"
]
const findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort();
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    return results;
}
console.log("Duplicate Words: " + findDuplicates(pokerWords))

let pokerWordsStr = ""
for (word of pokerWords.sort()) {
    pokerWordsStr += '"' + word + '",\n'
}
console.log(pokerWordsStr.substring(0, pokerWordsStr.length - 2))

let pokerWordsNotInList = "Poker Words Not In Wordle List: "
for (word of pokerWords) {
    if (!allWords.includes(word)) {
        allWords += word
        pokerWordsNotInList += word + ", "
    }
}
console.log(pokerWordsNotInList.substring(0, pokerWordsNotInList.length - 2))

let printStr = "Poker Words: " + pokerWords.length + "\n"
for (word of pokerWords) {
    printStr += word + " "
}
console.log(printStr)

// Create keyboard and grid in svg
const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const height = window.innerHeight
const width = Math.min(window.innerWidth, height / 1.5)
const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

const keyPaddingRatio = 1/6
const keyWidth = width / (10 + 11 * keyPaddingRatio)
const keyHeight = keyWidth * 1.5
const keyPadding = keyWidth * keyPaddingRatio
const keyboardHeight = keyHeight * 3 + keyPadding * 3
const keyboardY = height - keyboardHeight
const enter = "\u21AA\uFE0E"
const backspace = "\u232B\uFE0E"
const letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", enter, "Z", "X", "C", "V", "B", "N", "M", backspace]
const numLetters = [10, 9, 9]
const lettersOffset = [keyPadding, keyWidth * 0.5 + keyPadding * 1.5, keyPadding]
var count = 0
for (let r = 0; r < 3; r++) {
    let x = lettersOffset[r]
    for (let i = 0; i < numLetters[r]; i++) {
        let y = keyboardY + keyHeight * r + keyPadding * r
        let l = letters[count]
        let keyStretch = l === enter || l === backspace ? 1.5 : 1
        let id = l === enter ? "enter" : l === backspace ? "backspace" : l
        let key = svg.append("g")
            .attr("transform", "translate(" + x + "," + y + ")")
            .attr("id", "g" + id)
            .on("mouseover", function() {
                d3.selectAll(this.children).classed("hover", true)
                d3.selectAll(this.children[1].children).classed("hover", true)
            })
            .on("mouseout", function() {
                d3.selectAll(this.children).classed("hover", false)
                d3.selectAll(this.children[1].children).classed("hover", false)
            })
            .on("click", function() {
                typeKey(id)
                if (mobile) {
                    setTimeout(() => {
                        d3.selectAll(this.children).classed("hover", false)
                        d3.selectAll(this.children[1].children).classed("hover", false)
                    }, 100);
                }
            })
        
        key.append("rect")
            .attr("width", keyWidth * keyStretch + keyPadding * (keyStretch - 1))
            .attr("height", keyHeight)
            .attr("rx", keyWidth / 8)
            .attr("ry", keyWidth / 8)
            .attr("class", "key")
            .attr("id", "key" + id)
        
        key.append("g")
            .attr("transform", "translate(" + keyWidth / 2 + "," + keyHeight / 2 + ")")
            .classed("suitG", true)
        
        key.append("text")
            .attr("x", keyWidth / 2 * keyStretch * (l === enter ? 1.03 : 1))
            .attr("y", keyHeight * 0.65 * (l === enter ? 1.1 : 1))
            .attr("id", "text" + id)
            .text(l)
        
        count++
        x += (keyWidth + keyPadding) * keyStretch
    }
}

const boxPaddingRatio = 1/6
const boxS = width / (5 + 6 * keyPaddingRatio)
const boxP = boxS / 6
const boxBorderW = boxP / 2
for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
        let boxX = boxS * col + boxP * (col + 1)
        let boxY = boxS * row + boxP * (row + 1)

        let box = svg.append("g")
            .attr("transform", "translate(" + boxX + "," + boxY + ")")
            .attr("id", "g" + row + col)
        
        box.append("rect")
            .attr("width", boxS)
            .attr("height", boxS)
            .attr("rx", boxBorderW)
            .attr("ry", boxBorderW)
            .attr("class", "box")
            .attr("id", "box" + row + col)
            .attr("stroke", "#333")
            .attr("stroke-width", boxBorderW)
        
        box.append("g")
            .attr("transform", "translate(" + boxS / 2 + "," + boxS / 2 + ")")
            .classed("suitG", true)
        
        box.append("text")
            .attr("x", boxS / 2)
            .attr("y", boxS * 0.72)
            .attr("class", "gridText")
            .attr("id", "boxText" + row + col)
    }
}

svg.append("text")
    .attr("x", width / 2)
    .attr("y", width + boxS / 4)
    .attr("id", "answerText")

// Key listeners
var currentWord = pokerWords[Math.floor(Math.random() * pokerWords.length)]
console.log(currentWord)
var currentGuess = ""
var guessNum = 0
var guesses = ["", "", "", "", ""]
var resetReady = false

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    let code = `${e.code}`
    if (code.substring(0, 3) === "Key") {
        code = code.substring(3)
    } else if (code === "Enter" || code === "Backspace") {
        code = code.toLowerCase()
    } else {
        return
    }
    d3.select("#key" + code).classed("hover", true);
    typeKey(code)
}

function keyUp(e) {
    let code = `${e.code}`
    if (code.substring(0, 3) === "Key") {
        code = code.substring(3)
    } else if (code === "Enter" || code === "Backspace") {
        code = code.toLowerCase()
    } else {
        return
    }
    d3.select("#key" + code).classed("hover", false);
}

function updateGuess() {
    for (let col = 0; col < 5; col++) {
        let text = ""
        if (col < currentGuess.length) {
            text = currentGuess.substring(col, col + 1)
        }
        d3.select("#boxText" + guessNum + col)
            .classed("invalid", currentGuess.length === 5 && !validGuess())
            .text(text)
    }
}

function typeKey(key) {
    if (key === "enter") {
        pressEnter()
    } else if (key === "backspace") {
        pressBackspace()
    } else if (currentGuess.length < 5) {
        currentGuess += key
    }
    updateGuess()
}

function pressBackspace() {
    if (currentGuess.length > 0) {
        currentGuess = currentGuess.substring(0, currentGuess.length - 1)
    }
}

function pressEnter() {
    if (resetReady) {
        reset()
        return
    }
    let correct = false
    if (validGuess()) {
        correct = guess()
    }
    if (guessNum === 5) {
        resetReady = true
        if (!correct) {
            d3.select("#answerText").text(currentWord.toUpperCase())
        }
    }
}

function validGuess() {
    return currentGuess.length === 5 && allWords.includes(currentGuess.toLowerCase()) && !guesses.includes(currentGuess)
}

function reset() {
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            d3.select("#box" + row + col)
                .classed("club", false)
                .classed("diamond", false)
                .classed("heart", false)
                .classed("spade", false)
            d3.select("#boxText" + row + col)
                .text("")
        }
    }
    d3.selectAll(".key")
        .classed("club", false)
        .classed("diamond", false)
        .classed("heart", false)
        .classed("spade", false)
    d3.selectAll(".suitShape")
        .remove()
    d3.select("#answerText").text("")
    currentWord = pokerWords[Math.floor(Math.random() * pokerWords.length)]
    currentGuess = ""
    guessNum = 0
    guesses = ["", "", "", "", ""]
    resetReady = false
}

function guess() {
    let allCorrect = true
    let suits = [null, null, null, null, null]
    for (let col = 0; col < 5; col++) {
        let guessLetter = currentGuess.toLowerCase().substring(col, col + 1)
        let suit = "spade"
        if (guessLetter === currentWord.substring(col, col + 1)) {
            suit = "club"
        } else {
            allCorrect = false
            if (currentWord.includes(guessLetter)) {
                suit = "diamond"
            }
        }
        suits[col] = suit
    }
    // Double Letters
    let guessLetters = {}
    let wordLetters = {}
    for (l of currentGuess) {
        l = l.toLowerCase()
        if (guessLetters[l] === undefined) {
            guessLetters[l] = 1
        } else {
            guessLetters[l]++
        }
    }
    for (l of currentWord) {
        if (wordLetters[l] === undefined) {
            wordLetters[l] = 1
        } else {
            wordLetters[l]++
        }
    }
    for (key of Object.keys(guessLetters)) {
        if (guessLetters[key] > wordLetters[key]) {
            let extraLetters = guessLetters[key] - wordLetters[key]
            for (let i = 4; i >= 0; i--) {
                if (extraLetters > 0 && suits[i] === "diamond" && currentGuess.substring(i, i + 1).toLowerCase() === key) {
                    suits[i] = "spade"
                    extraLetters--
                }
            }
        }
    }
    for (let col = 0; col < 5; col++) {
        let l = currentGuess.substring(col, col + 1)
        let key = d3.select("#key" + l)
        key
            .classed("club", false)
            .classed("diamond", false)
            .classed("heart", false)
            .classed("spade", false)
        if (allCorrect) {
            resetReady = true
            drawSuit("heart", guessNum, col, l)
            key.classed("heart", true)
        } else {
            drawSuit(suits[col], guessNum, col, l)
            let suit = key.attr("class").substring(4)
            if (suit !== "club") {
                if (!(suit === "diamond" && suits[col] === "spade")) {
                    key.classed(suits[col], "true")
                }
            }
        }
    }
    guesses[guessNum] = currentGuess
    guessNum++
    currentGuess = ""
    return allCorrect
}

// Draw suits
const boxC = boxS / 2
const keyCX = keyWidth / 2
const keyCY = keyHeight / 2
const keyS = keyWidth
const d = [[0, boxS / 2.4], [boxS / 3.2, 0], [0, -boxS / 2.4], [-boxS / 3.2, 0]]
const dK = [[0, keyS / 2], [keyS * 0.375, 0], [0, -keyS / 2], [-keyS * 0.375, 0]]
const h = [[-boxS * 0.3, -boxS * 1/15], [0, -boxS / 6], [boxS * 0.3, -boxS * 1/15], [0, boxS / 3]]
const hK = [[-keyS * 0.3, -keyS * 1/15], [0, -keyS / 6], [keyS * 0.3, -keyS * 1/15], [0, keyS / 3]]
const c = [[0, -boxS / 6], [boxS / 6, boxS * Math.sqrt(2)/12], [-boxS / 6, boxS * Math.sqrt(2)/12]]
const cK = [[0, -keyS / 6], [keyS / 6, keyS * Math.sqrt(2)/12], [-keyS / 6, keyS * Math.sqrt(2)/12]]
var stem = [[0.01196, 0.1], [0.02992, 0.21313], [0.0387, 0.25], [0.05301, 0.3], [0.06568, 0.3377], [0.03, 0.3342], [0, 1/3], [-0.03, 0.3342], [-0.06568, 0.3377], [-0.05301, 0.3], [-0.0387, 0.25], [-0.02992, 0.21313], [-0.01196, 0.1]]
for (let i = 0; i < stem.length; i++) {
    stem[i][1] *= 7/6
}
function drawStem(gBox, gKey, suit, key) {
    gBoxStem = ""
    gKeyStem = ""
    for (i of stem) {
        gBoxStem += i[0] * boxC * 2 + ", " + i[1] * boxC * 2 + " "
        gKeyStem += i[0] * keyS + ", " + i[1] * keyS + " "
    }
    gBox.append("polygon")
        .attr("points", gBoxStem)
        .classed("suitShape", true)
        .classed(suit, true)
    gKey.append("polygon")
        .attr("points", gKeyStem)
        .classed("suitShape", true)
        .classed("ss" + key, true)
        .classed(suit, true)
}
function drawSuit(suit, row, col, key) {
    d3.selectAll(".ss" + key).remove()
    d3.select("#box" + row + col)
        .classed(suit, true)
    let gBox = d3.select("#g" + row + col).select(".suitG")
    let gKey = d3.select("#g" + key).select(".suitG")
    gKey.classed("spade", false)
    gKey.classed("heart", false)
    gKey.classed("diamond", false)
    gKey.classed("heart", false)
    gKey.classed(suit, true)
    switch (suit) {
        case "spade":
            for (i of [-1, 1]) {
                gBox.append("circle")
                    .attr("cx", -boxS / 6 * i)
                    .attr("cy", boxS / 6)
                    .attr("r", boxS / 6)
                    .classed("suitShape", true)
                    .classed(suit, true)
                gKey.append("circle")
                    .attr("cx", -keyS / 6 * i)
                    .attr("cy", keyS / 6)
                    .attr("r", keyS / 6)
                    .classed("suitShape", true)
                    .classed("ss" + key, true)
                    .classed(suit, true)
            }
            gBox.append("polygon")
                .attr("points", `${h[0][0]}, ${-h[0][1]} ${h[1][0]}, ${-h[1][1]} ${h[2][0]}, ${-h[2][1]} ${h[3][0]}, ${-h[3][1]}`)
                .classed("suitShape", true)
                .classed(suit, true)
            gKey.append("polygon")
                .attr("points", `${hK[0][0]}, ${-hK[0][1]} ${hK[1][0]}, ${-hK[1][1]} ${hK[2][0]}, ${-hK[2][1]} ${hK[3][0]}, ${-hK[3][1]}`)
                .classed("suitShape", true)
                .classed("ss" + key, true)
                .classed(suit, true)
            drawStem(gBox, gKey, suit, key)
            break
        case "heart":
            for (i of [-1, 1]) {
                gBox.append("circle")
                    .attr("cx", -boxS / 6 * i)
                    .attr("cy", -boxS / 6)
                    .attr("r", boxS / 6)
                    .classed("suitShape", true)
                    .classed(suit, true)
                gKey.append("circle")
                    .attr("cx", -keyS / 6 * i)
                    .attr("cy", -keyS / 6)
                    .attr("r", keyS / 6)
                    .classed("suitShape", true)
                    .classed("ss" + key, true)
                    .classed(suit, true)
            }
            gBox.append("polygon")
                .attr("points", `${h[0][0]}, ${h[0][1]} ${h[1][0]}, ${h[1][1]} ${h[2][0]}, ${h[2][1]} ${h[3][0]}, ${h[3][1]}`)
                .classed("suitShape", true)
                .classed(suit, true)
            gKey.append("polygon")
                .attr("points", `${hK[0][0]}, ${hK[0][1]} ${hK[1][0]}, ${hK[1][1]} ${hK[2][0]}, ${hK[2][1]} ${hK[3][0]}, ${hK[3][1]}`)
                .classed("suitShape", true)
                .classed("ss" + key, true)
                .classed(suit, true)
            break
        case "diamond":
            gBox.append("polygon")
                .attr("points", `${d[0][0]}, ${d[0][1]} ${d[1][0]}, ${d[1][1]} ${d[2][0]}, ${d[2][1]} ${d[3][0]}, ${d[3][1]}`)
                .classed("suitShape", true)
                .classed(suit, true)
            gKey.append("polygon")
                .attr("points", `${dK[0][0]}, ${dK[0][1]} ${dK[1][0]}, ${dK[1][1]} ${dK[2][0]}, ${dK[2][1]} ${dK[3][0]}, ${dK[3][1]}`)
                .classed("suitShape", true)
                .classed("ss" + key, true)
                .classed(suit, true)
            break
        case "club":
            gBox.append("circle")
                .attr("r", boxC / 4)
                .classed("suitShape", true)
                .classed(suit, true)
            gKey.append("circle")
                .attr("r", keyS / 8)
                .classed("suitShape", true)
                .classed("ss" + key, true)
                .classed(suit, true)
            for (i of c) {
                gBox.append("circle")
                    .attr("cx", i[0])
                    .attr("cy", i[1])
                    .attr("r", boxC / 3)
                    .classed("suitShape", true)
                    .classed(suit, true)
            }
            for (i of cK) {
                gKey.append("circle")
                    .attr("cx", i[0])
                    .attr("cy", i[1])
                    .attr("r", keyS / 6)
                    .classed("suitShape", true)
                    .classed("ss" + key, true)
                    .classed(suit, true)
            }
            drawStem(gBox, gKey, suit, key)
            break
    }
}
