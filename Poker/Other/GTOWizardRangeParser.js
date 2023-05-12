/*
INSTRUCTIONS:
1. Open range in GTOWizard
2. Open the JavaScript console
3. Paste this code there and press Enter
4. If you want to copy the range text so you can paste it in Google Sheets, immediately press Tab after running the code
*/
// Defines array of index to hand pairs (Ex. 0: AA, 1: AKs, 13: AKo, 168: 22)
let specialSpace = " ";
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
// Extracts colors from hand
function extractUniqueHexColors(rgbs) {
    // Regular expression to match RGB color values
    const rgbRegExp = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g;
  
    // Function to convert an RGB color value to a HEX color value
    function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
    }
  
    // Extract RGB color values from the rgbs string
    const rgbValues = [...rgbs.matchAll(rgbRegExp)].map(match => {
        return {r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3])};
    });
  
    // Convert RGB values to HEX values and filter out duplicates
    const uniqueHexValues = [...new Set(rgbValues.map(({r, g, b}) => rgbToHex(r, g, b)))];
  
    return uniqueHexValues;
}
// Extracts freqs for each action
function extractNonCumulativePercentages(percents) {
    if (percents === "") {
        return [0];
    }

    // Regular expression to match percentages
    const percentageRegExp = /(\d+(?:\.\d+)?)%/g;
  
    // Extract percentage values from the percents string
    const percentageValues = [...percents.matchAll(percentageRegExp)].map(match => parseFloat(match[1]));
  
    // Filter out only the first percentage of each group
    const cumulativePercentages = percentageValues.filter((_, index) => index % 2 === 0);
  
    // Calculate the non-cumulative percentages
    const nonCumulativePercentages = cumulativePercentages.reduce((acc, percentage, index) => {
        if (index === 0) {
            acc.push(Math.round(percentage * 10) / 10);
        } else {
            acc.push(Math.round((percentage - acc.reduce((a, b) => a + b, 0)) * 10) / 10);
        }
        return acc;
    }, []);
    // Add the range height as the first percentage
    nonCumulativePercentages.unshift(percentageValues[1] > 99.5 ? 100 : Math.round(percentageValues[1] * 10) / 10);
  
    return nonCumulativePercentages;
}
// Action names, colors, and freqs
let actionNames = ["C", "F", "R1", "R1_2", "R2", "R2_2", "R3", "R3_2", "R4", "R4_2"];
let actionColors = {};
for (act of actionNames) {
    actionColors[act] = getComputedStyle(document.documentElement).getPropertyValue("--clr-" + act).toLowerCase();
}
let actionFreqs = {};
actionFreqs["Height"] = [];
for (act of actionNames) {
    actionFreqs[act] = [];
}
// Push every hand's freqs for each action into their respective arrays
for (let i = 0; i < 169; i++) {
    // Get CSS style from hand div
    let style = document.getElementsByClassName("ra_table")[0].children[i].style;
    // Format: '21.5% 100%, 86.5% 100%, 100% 100%'
    // -> [100, 21.5, 65, 13.5]
    let colorFreqs = extractNonCumulativePercentages(style.backgroundSize);
    // Format: 'linear-gradient(to right, rgb(216, 59, 59), rgb(216, 59, 59)), linear-gradient(to right, rgb(245, 83, 83), rgb(245, 83, 83)), linear-gradient(to right, rgb(90, 185, 102), rgb(90, 185, 102))'
    // -> ['#d83b3b', '#f55353', '#5ab966']
    let colors = extractUniqueHexColors(style.backgroundImage);
    
    actionFreqs["Height"].push(colorFreqs[0]);
    for (action of actionNames) {
        if (colorFreqs.length === 0) {
            actionFreqs[action].push(0);
            continue;
        }
        if (colors.indexOf(actionColors[action]) === -1) {
            actionFreqs[action].push(0);
        } else {
            actionFreqs[action].push(colorFreqs[colors.indexOf(actionColors[action]) + 1]);
        }
    }
}

// Print GTO ranges for each action array
function printGTO() {
    for (const [name, freqs] of Object.entries(actionFreqs)) {
        // Array of each unique freqency percentage
        let actionUniqueFreqs = [0];
        for (let i = 0; i < 169; i++) {
            if (!actionUniqueFreqs.includes(freqs[i])) {
                actionUniqueFreqs.push(freqs[i]);
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
                    if (freqs[i] === freq) {
                        actionString += indexToHand[i] + ",";
                    }
                }
                actionString = actionString.substring(0, actionString.length - 1);
            } else { // 90% frequency -> [90]XX[/90]
                actionString += "[" + freq + "]";
                for (let i = 0; i < 169; i++) {
                    if (freqs[i] === freq) {
                        actionString += indexToHand[i] + ",";
                    }
                }
                actionString = actionString.substring(0, actionString.length - 1);
                actionString += "[/" + freq + "]";
            }
            actionString += ",";
        }
        actionString = actionString.substring(0, actionString.length - 1);
        // Only print if not empty
        if (actionString !== "") {
            console.log(name + ": " + actionString);
        }
    }
}

// Prints freqs from actionFreqs
function printFreqs() {
    for (const [name, freqs] of Object.entries(actionFreqs)) {
        let actionString = "";
        for (let i = 0; i < 169; i++) {
            actionString += " ".repeat(5 - freqs[i].toString().length) + freqs[i] + (i % 13 === 12 ? "\n" : "");
        }
        actionString = actionString.substring(0, actionString.length - 1);
        // Only print if not all 0s
        if (!/^[0\s]*$/.test(actionString)) {
            console.log(name + ":\n" + actionString);
        }
    }
}

const actions = ["A", "Y", "R", "C", "F"];
// Converts freqs into buckets of 25% frequency and copies to clipboard for pasting in Google Sheets
function printAndCopySimplifiedRange() {
    let rangeString = "";
    let handBuckets = [];
    let actionToColorDict = {
        "A": "R4",
        "Y": "R2",
        "R": "R1",
        "C": "C",
        "F": "F"
    };

    // Update actionToColorDict based on the non-zero keys in actionFreqs
    let nonZeroKeys = Object.keys(actionFreqs).filter(key => actionFreqs[key].some(freq => freq !== 0));
    // If R4, R3, R2, R1, C
    if (nonZeroKeys.includes("R3")) {
        actionToColorDict["F"] = "R3";
    }
    // If R2, R1, C, F
    if (!nonZeroKeys.includes("R4") && !nonZeroKeys.includes("R3")) {
        actionToColorDict["A"] = "R2";
        actionToColorDict["Y"] = "R4";
    }
    // Convert actionFreqs to buckets
    for (let i = 0; i < 169; i++) {
        let bucket = "";
        // Set A, Y, R, C, F to the correct actionFreqs
        let A = actionFreqs[actionToColorDict["A"]][i];
        let Y = actionFreqs[actionToColorDict["Y"]][i];
        let R = actionFreqs[actionToColorDict["R"]][i];
        let C = actionFreqs[actionToColorDict["C"]][i];
        let F = actionFreqs[actionToColorDict["F"]][i];

        // Create P90Q buckets
        let found = false;

        // Create an array of objects representing each action and its frequency
        let actionFreqArray = actions.map(action => {
            return {action: action, freq: actionFreqs[actionToColorDict[action]][i]}
        });

        // Sort the array by frequency in descending order
        actionFreqArray.sort((a, b) => b.freq - a.freq);

        // Check if Q is the second most frequent action and 5 <= Q < 15
        if (actionFreqArray[1].freq >= 5 && actionFreqArray[1].freq < 15) {
            bucket = actionFreqArray[0].action + "90" + actionFreqArray[1].action;
            found = true;
        }

        if (!found) {
            if (A === 0 && Y === 0 && R === 0 && C === 0 && F === 0) {
                bucket = "NONE"; // Not In Range
            } else {
                // 1. Put values of A, Y, R, C, F in a dictionary
                let actionFreqDict = { A, Y, R, C, F };
                // 2. If lowest frequency action is >= 12.5 and < 37.5, then bucket += action letter
                // 3. If lowest frequency action is >= 37.5, then bucket += action letter * 2
                // 4. Remove lowest frequency action dictionary
                // 5. Repeat 2-4 until dictionary has one action left
                while (Object.keys(actionFreqDict).length > 1) {
                    let lowestAction = Object.keys(actionFreqDict).reduce((a, b) => actionFreqDict[a] < actionFreqDict[b] ? a : b);
                    let lowestFreq = actionFreqDict[lowestAction];
                    if (lowestFreq >= 12.5 && lowestFreq < 37.5) {
                        bucket += lowestAction[0];
                    } else if (lowestFreq >= 37.5) {
                        bucket += lowestAction[0] + lowestAction[0];
                    }
                    delete actionFreqDict[lowestAction];
                }
                // 6. Fill bucket with the remaining action letter until it has a length of 4
                let remainingAction = Object.keys(actionFreqDict)[0];
                while (bucket.length < 4) {
                    bucket += remainingAction[0];
                }
                // 7. Sort in correct action order
                bucket = [...bucket].sort((a, b) => "AYRCF".indexOf(a) - "AYRCF".indexOf(b)).join("");
            }
        }

        handBuckets.push(bucket);
    }
    console.log(handBuckets);
    let readableString = "\n";
    for (let i = 0; i < 169; i++) {
        readableString += indexToHand[i] + (indexToHand[i].length === 3 ? " " : "  ") + handBuckets[i] + " / ";
        if (i % 13 === 12) {
            readableString = readableString.substring(0, readableString.length - 3);
            readableString += "\n";
        }
    }
    console.log(readableString);
    // Convert handBuckets to rangeString
    let freqsStrings = calcTotalActionFreqs();
    for (let i = 0; i < 169; i++) {
        let actionFreqString = specialSpace;
        if (Math.floor(i / 13) < freqsStrings.length) {
            actionFreqString = freqsStrings[Math.floor(i / 13)];
            console.log(actionFreqString)
        }
        rangeString += "\"" + indexToHand[i] + "     " + handBuckets[i] + "\"" + (i % 13 === 12 ? "	\"" + actionFreqString + "\"\n" : "	"); // Next cell unicode symbol
    }
    // Print and copy to clipboard
    console.log(rangeString);
    // 0.5s delay to press Tab so document is focused and you can copy to clipboard
    setTimeout(async() => console.log(await window.navigator.clipboard.writeText(rangeString) === undefined ? "Copied to clipboard" : "Error"), 500);
}

function calcTotalActionFreqs(print = false) {
    let totalActionFreqs = {};
    let totalFrequency = 0;

    for (const action in actionFreqs) {
        if (action === "Height") continue; // Skip Height

        let actionFrequency = 0;

        for (let i = 0; i < actionFreqs[action].length; i++) {
            let combos = indexToHand[i].substring(2) === "o" ? 12 : indexToHand[i].substring(2) === "s" ? 4 : 6;
            // Multiply the individual hand's freqs by its height
            actionFrequency += actionFreqs[action][i] * actionFreqs["Height"][i] * combos;
        }

        totalActionFreqs[action] = actionFrequency;
        totalFrequency += actionFrequency;
    }

    for (const action in totalActionFreqs) {
        let percentage = (totalActionFreqs[action] / totalFrequency) * 100;
        // Round to the nearest tenth
        percentage = Math.round(percentage * 10) / 10;
        totalActionFreqs[action] = percentage;
        if (print) {
            console.log(action + ": " + percentage + "%");
        }
    }
    const actionToKeyDict = {
        "A": "R4",
        "Y": "R2",
        "R": "R1",
        "C": "C",
        "F": "F"
    };
    
    if (totalActionFreqs["R3"] !== 0) {
        actionToKeyDict["F"] = "R3";
    }

    if (totalActionFreqs["R4"] === 0 && totalActionFreqs["R3"] === 0) {
        actionToKeyDict["A"] = "R2";
        actionToKeyDict["Y"] = "R4";
    }

    let freqsArray = [];
    for (let action of actions) {
        freqsArray.push([action, totalActionFreqs[actionToKeyDict[action]]]);
    }

    if (totalActionFreqs["R3"] !== 0) {
        freqsArray = [freqsArray[0], freqsArray[4], ...freqsArray.slice(1, 4), ...freqsArray.slice(5)];
    }
    freqsArray = freqsArray.filter(innerArray => innerArray[1] !== 0);

    let freqsStrings = [];
    for (let innerArray of freqsArray) {
        freqsStrings.push(innerArray[1] + specialSpace.repeat(actions.indexOf(innerArray[0]) + 1));
    }

    if (print) {
        console.log(totalActionFreqs);
        console.log(freqsArray);
        console.log(freqsStrings);
    }
    return freqsStrings;
}

printGTO();
printFreqs();
printAndCopySimplifiedRange();
calcTotalActionFreqs(true);

console.log("Remember to immediately press Tab to focus on the document and copy to clipboard");