// INSTRUCTIONS: Open range in GTOWizard, open the JavaScript console, paste this code there
// Defines array of index to hand pairs (Ex. 0: AA, 1: AKs, 13: AKo, 168: 22)
let cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
let indexToHand = [];
for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 13; j++) {
        if (i === j) {
            indexToHand.push(cards[i] + cards[j]);
        } else if (i < j) {
            indexToHand.push(cards[i] + cards[j] + "s");
        } else {
            indexToHand.push(cards[j] + cards[i] + "o");
        }
    }
}
// Arrays for each action
let allInFreqs = [];
let raiseFreqs = [];
let callFreqs = [];
let foldFreqs = [];
// Push every hand's frequencies for each action into their respective arrays
for (let i = 0; i < 169; i++) {
    // Get CSS style from hand div
    let style = document.getElementsByClassName("ra_table")[0].children[i].style;
    // Number of actions the hand is split into
    let splits = style.backgroundSize.split(",").length;
    // Format: '21.5% 100%, 86.5% 100%, 100% 100%'
    let colorFreqs = style.backgroundSize;
    // Format: 'linear-gradient(to right, rgb(216, 59, 59), rgb(216, 59, 59)), linear-gradient(to right, rgb(245, 83, 83), rgb(245, 83, 83)), linear-gradient(to right, rgb(90, 185, 102), rgb(90, 185, 102))'
    let colors = style.backgroundImage;
    let addedFreqs = 0;
    // Stop if hand does not exist in range
    if (colorFreqs === "") {
        allInFreqs.push(0);
        raiseFreqs.push(0);
        callFreqs.push(0);
        foldFreqs.push(0);
        continue;
    }
    // Frequency for previous action (height of cell)
    let prevFreq = Math.round(parseFloat(colorFreqs.split(" ")[colorFreqs.split(" ").length - 1].substring(0, colorFreqs.split(" ")[colorFreqs.split(" ").length - 1].length - 1)).toFixed(2) * 100) / 100;
    // For each possible action with hand
    for (let j = 0; j < splits; j++) {
        let color = colors.substring(colors.indexOf("rgb") + 4, colors.indexOf("rgb") + 16);
        let freq = Math.round((parseFloat(colorFreqs.substring(0, colorFreqs.indexOf("%"))).toFixed(2) - addedFreqs) * prevFreq) / 100;
        switch (color) {
            case "216, 59, 59)": // All in
                allInFreqs.push(freq);
                break;
            case "245, 83, 83)": // Raise
                raiseFreqs.push(freq);
                break;
            case "90, 185, 102": // Call
                callFreqs.push(freq);
                break;
            case "59, 128, 155": // Fold
                foldFreqs.push(freq);
                break;
        }
        addedFreqs += freq / prevFreq * 100;
        colorFreqs = colorFreqs.substring(colorFreqs.indexOf(",") + 2);
        colors = colors.substring(colors.indexOf(", linear-gradient") + 2);
    }
    // Push 0 to arrays if action is not taken
    if (allInFreqs.length !== i + 1) {
        allInFreqs.push(0);
    }
    if (raiseFreqs.length !== i + 1) {
        raiseFreqs.push(0);
    }
    if (callFreqs.length !== i + 1) {
        callFreqs.push(0);
    }
    if (foldFreqs.length !== i + 1) {
        foldFreqs.push(0);
    }
}
// Print GTO ranges for each action array
for (let actionFreqs of [allInFreqs, raiseFreqs, callFreqs, foldFreqs]) {
    // Array of each unique freqency percentage
    let actionUniqueFreqs = [0];
    for (let i = 0; i < 169; i++) {
        if (!actionUniqueFreqs.includes(actionFreqs[i])) {
            actionUniqueFreqs.push(actionFreqs[i]);
        }
    }
    // Sort descending
    actionUniqueFreqs.sort(function(a, b) {return b - a});
    let actionString = "";
    for (let freq of actionUniqueFreqs) {
        if (freq === 0) {
            continue;
        } else if (freq === 100) { // 100% frequency does not need [100]XX[/100]
            for (let i = 0; i < 169; i++) {
                if (actionFreqs[i] === freq) {
                    actionString += indexToHand[i] + ",";
                }
            }
            actionString = actionString.substring(0, actionString.length - 1);
        } else { // 90% frequency -> [90]XX[/90]
            actionString += "[" + freq + "]";
            for (let i = 0; i < 169; i++) {
                if (actionFreqs[i] === freq) {
                    actionString += indexToHand[i] + ",";
                }
            }
            actionString = actionString.substring(0, actionString.length - 1);
            actionString += "[/" + freq + "]";
        }
        actionString += ",";
    }
    actionString = actionString.substring(0, actionString.length - 1);
    // Print GTO range
    switch (actionFreqs) {
        case allInFreqs:
            console.log("All In: " + actionString);
            break;
        case raiseFreqs:
            console.log("Raise: " + actionString);
            break;
        case callFreqs:
            console.log("Call: " + actionString);
            break;
        case foldFreqs:
            console.log("Fold: " + actionString);
            break;
    }
}