/*
INSTRUCTIONS:
1. Open range in GTOWizard
    a. If range has parts not in range, change cell mode to Full Height
2. Open the JavaScript console
3. Paste this code there and press Enter
*/
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
let raise7Freqs = [];
let raise6Freqs = [];
let raise5Freqs = [];
let raise4Freqs = [];
let raise3Freqs = [];
let raise2Freqs = [];
let raise1Freqs = [];
let raise0Freqs = [];
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
    // Format: 'linear-gradient(to right, var(--clr-R1), var(--clr-R1)),linear-gradient(to right, var(--clr-F), var(--clr-F))'
    let colors = style.backgroundImage;
    let addedFreqs = 0;
    // Stop if hand does not exist in range
    if (colorFreqs === "") {
        raise7Freqs.push(0);
        raise6Freqs.push(0);
        raise5Freqs.push(0);
        raise4Freqs.push(0);
        raise3Freqs.push(0);
        raise2Freqs.push(0);
        raise1Freqs.push(0);
        raise0Freqs.push(0);
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
            case "143, 0, 0), ": // Raise7
                raise7Freqs.push(freq);
                break;
            case "171, 23, 23)": // Raise6
                raise6Freqs.push(freq);
                break;
            case "180, 30, 30)": // Raise5
                raise5Freqs.push(freq);
                break;
            case "194, 41, 41)": // Raise4
                raise4Freqs.push(freq);
                break;
            case "205, 50, 50)": // Raise3
                raise3Freqs.push(freq);
                break;
            case "216, 59, 59)": // Raise2
                raise2Freqs.push(freq);
                break;
            case "230, 71, 71)": // Raise1
                raise1Freqs.push(freq);
                break;
            case "245, 83, 83)": // Raise0
                raise0Freqs.push(freq);
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
    if (raise7Freqs.length !== i + 1) {
        raise7Freqs.push(0);
    }
    if (raise6Freqs.length !== i + 1) {
        raise6Freqs.push(0);
    }
    if (raise5Freqs.length !== i + 1) {
        raise5Freqs.push(0);
    }
    if (raise4Freqs.length !== i + 1) {
        raise4Freqs.push(0);
    }
    if (raise3Freqs.length !== i + 1) {
        raise3Freqs.push(0);
    }
    if (raise2Freqs.length !== i + 1) {
        raise2Freqs.push(0);
    }
    if (raise1Freqs.length !== i + 1) {
        raise1Freqs.push(0);
    }
    if (raise0Freqs.length !== i + 1) {
        raise0Freqs.push(0);
    }
    if (callFreqs.length !== i + 1) {
        callFreqs.push(0);
    }
    if (foldFreqs.length !== i + 1) {
        foldFreqs.push(0);
    }
}
// Print GTO ranges for each action array
for (let actionFreqs of [raise7Freqs, raise6Freqs, raise5Freqs, raise4Freqs, raise3Freqs, raise2Freqs, raise1Freqs, raise0Freqs, callFreqs, foldFreqs]) {
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
        case raise7Freqs:
            console.log("Raise7: " + actionString);
            break;
        case raise6Freqs:
            console.log("Raise6: " + actionString);
            break;
        case raise5Freqs:
            console.log("Raise5: " + actionString);
            break;
        case raise4Freqs:
            console.log("Raise4: " + actionString);
            break;
        case raise3Freqs:
            console.log("Raise3: " + actionString);
            break;
        case raise2Freqs:
            console.log("Raise2: " + actionString);
            break;
        case raise1Freqs:
            console.log("Raise1: " + actionString);
            break;
        case raise0Freqs:
            console.log("Raise0: " + actionString);
            break;
        case callFreqs:
            console.log("Call/Check: " + actionString);
            break;
        case foldFreqs:
            console.log("Fold: " + actionString);
            break;
    }
}