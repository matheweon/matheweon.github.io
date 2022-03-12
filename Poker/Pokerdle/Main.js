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
    "busts",
    "buyer",
    "buyin",
    "calls",
    "cards",
    "catch",
    "cents",
    "chase",
    "cheat",
    "check",
    "chips",
    "chops",
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
const keyPaddingRatio = 1/6
const keyWidth = width / (10 + 11 * keyPaddingRatio)
const keyHeight = keyWidth * 1.5
const keyPadding = keyWidth * keyPaddingRatio
const keyboardHeight = keyHeight * 3 + keyPadding * 3
const keyboardY = height - keyboardHeight
const keyboard = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("id", "keyboard")
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
        let key = keyboard.append("g")
            .attr("transform", "translate(" + x + "," + y + ")")
        
        key.append("rect")
            .attr("width", keyWidth * keyStretch + keyPadding * (keyStretch - 1))
            .attr("height", keyHeight)
            .attr("rx", keyWidth / 8)
            .attr("ry", keyWidth / 8)
            .attr("class", "key")
        
        key.append("text")
            .attr("x", keyWidth / 2 * keyStretch)
            .attr("y", keyHeight * 0.65 * (l === enter ? 1.1 : 1))
            .text(l)
        
        count++
        x += (keyWidth + keyPadding) * keyStretch
    }
}