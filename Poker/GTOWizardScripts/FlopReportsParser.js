// Go to bottom for instructions and notes

// Flop Aggregate Reports Parser
function flop() {
    let actionsDiv = document.getElementsByClassName('sab')[0];
    numActions = actionsDiv.children.length;
    let flopActions = [];
    for (let i = 0; i < numActions; i++) {
        let action;
        if (actionsDiv.children[i].children[1].children[0].children[0].children.length === 0) {
            action = 'X';
        } else {
            action = 'b' + parseFloat(actionsDiv.children[i].children[1].children[0].children[0].children[0].innerHTML.replace(/\(/g, ''));
        }
        let actionFreq = parseFloat(document.getElementsByClassName('sab')[0].children[i].children[1].children[0].children[1].innerHTML);
        flopActions.push([action, actionFreq]);
    }
    console.log(flopActions);
}

function openFilter() {
    if (document.getElementsByClassName('gw_pop_menu_content').length === 0) {
        document.getElementsByClassName('mdi-filter')[0].click();
    }
}

const codeToFlopType = {
    'r': [0, 1],
    't': [0, 2],
    'f': [0, 3],
    'u': [1, 1],
    'p': [1, 2],
    '3': [1, 3],
    'd': [2, 1],
    'c': [2, 3]
}
function flopType(code) {
    let panel = document.getElementsByClassName('reports-flop-filter')[0];
    let row = codeToFlopType[code][0];
    let col = codeToFlopType[code][1];
    panel.children[row].children[1].children[0].click();
    setTimeout(() => {
        panel.children[row].children[1].children[col].click();
    }, 100);
}

function flopRanks(ranks) {
    let panel = document.getElementsByClassName('reports-flop-filter')[0];
    panel.children[4].children[1].children[0].click();
    panel.children[5].children[1].children[0].click();
    panel.children[6].children[1].children[0].click();
}

/*
INSTRUCTIONS:
1. Open Flop Aggregate Reports in GTOWizard
2. Open the JavaScript console
3. Paste this code there and press Enter
4. Make sure flop action percentages are visible
5. Use flop() to get the flop actions
*/

/*
NOTES:
1. 
*/