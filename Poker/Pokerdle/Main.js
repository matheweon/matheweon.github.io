const pokerWords = [
    "added",
    "addon",
    "aggro",
    "allin",
    "angle",
    "antes",
    "backs",
    "balls",
    "banks",
    "beats",
    "begin",
    "belly",
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
    "folds",
    "force",
    "fours",
    "front",
    "funds",
    "games",
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
    "hunts",
    "idiot",
    "image",
    "imply",
    "jacks",
    "joker",
    "kicks",
    "kings",
    "later",
    "lasts",
    "leads",
    "leaks",
    "leave",
    "legal",
    "level",
    "light",
    "limit",
    "limps",
    "lines",
    "locks",
    "lodge",
    "looks",
    "loose",
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
    "poker",
    "polar",
    "posts",
    "preys",
    "probe",
    "props",
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
    "speed",
    "spike",
    "split",
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
    "think",
    "thins",
    "third",
    "three",
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
    "wakes",
    "walks",
    "waits",
    "weeds",
    "whale",
    "wheel",
    "white",
    "witty",
    "wraps",
    "yacht",
    "zeros"
]
let pokerWordsNotInList = "Poker Words Not In List: "
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

const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const width = Math.min(window.innerWidth, 500)
const height = window.innerHeight
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
        
        key.append("rect")
            .attr("width", keyWidth * keyStretch + keyPadding * (keyStretch - 1))
            .attr("height", keyHeight)
            .attr("rx", keyWidth / 8)
            .attr("ry", keyWidth / 8)
            .attr("class", "key")
            .attr("id", "key" + id)
            .on("mouseover", function() {
                d3.select(this).classed("hover", true);
                if (mobile) {
                    setTimeout(() => {d3.select(this).classed("hover", false)}, 250);
                }
            })
            .on("mouseout", function() {
                d3.select(this).classed("hover", false);
            })
            .on("click", function() {
                typeKey(id)
            })
        
        key.append("text")
            .attr("x", keyWidth / 2 * keyStretch * (l === enter ? 1.03 : 1))
            .attr("y", keyHeight * 0.65 * (l === enter ? 1.1 : 1))
            .attr("id", "text" + id)
            .text(l)
            .on("mouseover", function() {
                d3.select(this).classed("hover", true);
                d3.select(this.parentNode.children[0]).classed("hover", true);
            })
            .on("mouseout", function() {
                d3.select(this).classed("hover", false);
                d3.select(this.parentNode.children[0]).classed("hover", false);
            })
            .on("click", function() {
                typeKey(id)
            })
        
        count++
        x += (keyWidth + keyPadding) * keyStretch
    }
}

var currentWord = pokerWords[Math.floor(Math.random() * pokerWords.length)]
var currentGuess = ""
var guessNum = 0
var guesses = ["", "", "", "", ""]
/*var guessSuits = [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1]
]*/
var resetReady = false

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

function validGuess() {
    return currentGuess.length === 5 && allWords.includes(currentGuess.toLowerCase()) && !guesses.includes(currentGuess)
}

function pressEnter() {
    if (resetReady) {
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
        currentWord = pokerWords[Math.floor(Math.random() * pokerWords.length)]
        currentGuess = ""
        guessNum = 0
        guesses = ["", "", "", "", ""]
        resetReady = false
        return
    }
    if (validGuess()) {
        let allCorrect = true
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
            d3.select("#box" + guessNum + col)
                .classed(suit, true)
        }
        if (allCorrect) {
            for (let col = 0; col < 5; col++) {
                d3.select("#box" + guessNum + col)
                    .classed("club", false)
                    .classed("heart", true)
            }
            resetReady = true
            return
        }
        guesses[guessNum] = currentGuess
        guessNum++
        currentGuess = ""
    }
    if (guessNum === 5) {
        resetReady = true
        console.log("The word was " + currentWord)
    }
}

function pressBackspace() {
    if (currentGuess.length > 0) {
        currentGuess = currentGuess.substring(0, currentGuess.length - 1)
    }
}

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
        
        box.append("text")
            .attr("x", boxS / 2)
            .attr("y", boxS * 0.72)
            .attr("class", "gridText")
            .attr("id", "boxText" + row + col)
    }
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