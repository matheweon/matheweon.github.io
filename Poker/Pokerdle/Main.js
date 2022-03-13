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
for (word of pokerWords) {
    if (!allWords.includes(word)) {
        allWords += word
        console.log(word)
    }
}
let printStr = "Poker Words: " + pokerWords.length + "\n"
for (word of pokerWords) {
    printStr += word + " "
}
console.log(printStr)

const width = window.innerWidth
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
const enter = "\u21AA"
const backspace = "\u232B"
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
        
        key.append("rect")
            .attr("width", keyWidth * keyStretch + keyPadding * (keyStretch - 1))
            .attr("height", keyHeight)
            .attr("rx", keyWidth / 8)
            .attr("ry", keyWidth / 8)
            .attr("class", "key")
            .attr("id", "key" + id)
            .on("mouseover", function() {
                d3.select(this).classed("hover", true);
            })
            .on("mouseout", function() {
                d3.select(this).classed("hover", false);
            })
            .on("click", function() {
                typeKey(id)
            })
        
        key.append("text")
            .attr("x", keyWidth / 2 * keyStretch)
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

var currentWord = "raise"
var currentGuess = ""
var wordSuits = [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1]
]

function typeKey(key) {
    if (key === "enter") {
        pressEnter()
    } else if (key === "backspace") {
        pressBackspace()
    } else if (currentGuess.length < 5) {
        currentGuess += key
    }
    console.log(currentGuess)
}

function pressEnter() {
    if (allWords.includes(currentGuess.toLowerCase())) {
        currentGuess = ""
    }
}

function pressBackspace() {
    if (currentGuess.length > 0) {
        currentGuess = currentGuess.substring(0, currentGuess.length - 1)
    }
}

document.addEventListener("keydown", pressKey);

function pressKey(e) {
    let code = `${e.code}`
    if (code.substring(0, 3) === "Key") {
        typeKey(code.substring(3))
    } else if (code === "Enter" || code === "Backspace") {
        typeKey(code.toLowerCase())
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
        svg.append("rect")
            .attr("x", boxX)
            .attr("y", boxY)
            .attr("width", boxS)
            .attr("height", boxS)
            .attr("class", "box")
            .attr("stroke", "#333")
            .attr("stroke-width", boxBorderW)
    }
}