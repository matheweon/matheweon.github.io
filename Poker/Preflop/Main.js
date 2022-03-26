// Create elements in svg
const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const mobileClickMs = 300
var width = window.innerWidth
var height = Math.min(window.innerHeight, width * 0.65)
const root = document.querySelector(':root')
const stdTextSize = height / 50
root.style.setProperty('--textSize', stdTextSize + 'px')
root.style.setProperty('--bigTextSize', stdTextSize * 3.75 + 'px')
root.addEventListener('dblclick', function(e) {
    e.preventDefault()
})
const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
const background = svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .on('click', () => {
        let roll = Math.floor(Math.random() * 100)
        if (roll < 10) {
            roll = '0' + roll
        }
        displayActionFreqs()
        rollText.text(roll)
    })

const actionColors = {
    'r-3': ['a35', 'a30', 'a25', 'a20', 'a17', 'a14', 'a12', 'a10'],
    'r-2': ['rB6', 'r7', 'r10'],
    'r-1': ['o2', 'o2_1', 'o2_2', 'o2_3', 'o2_5', 'o3', 'o3_5', 'o4', 'r4', 'r4_5', 'r5', 'r6', 'r6_5'],
    'r-0': ['r2_5', 'r3', 'r3_5']
}

function condenseClasses(r) {
    let output = ''
    for (c of actionColors['r-' + r]) {
        output += '.' + c + ', '
    }
    return output.substring(0, output.length - 2)
}

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const cellB = 2
const cellS = Math.floor((height - 14 * cellB) / 13)
const cellsW = cellS * 13 + cellB * 14

function iterCells(func) {
    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
            func(i, j)
        }
    }
}

const cells = svg.append('g').attr('id', 'cells')
iterCells((i, j) => {
    let g = cells.append('g')
        .attr('transform', 'translate(' + (cellB + (cellS + cellB) * j) + ',' + (cellB + (cellS + cellB) * i) + ')')
        .classed('cellG', true)
        .attr('id', 'cellG' + i + '-' + j)
    let hand = ranks[i] + ranks[j]
    if (i < j) {
        hand += 's'
    } else if (i > j) {
        hand = hand.substring(1) + hand.substring(0, 1) + 'o'
    }
    g.append('text')
        .attr('x', cellS / 32)
        .attr('y', cellS / 4)
        .classed('textLeft', true)
        .text(hand)
})

const cellLines = svg.append('g').attr('id', 'cellLines')
for (let i = 0; i < 14; i++) {
    cellLines.append('rect')
        .attr('x', (cellS + cellB) * i)
        .attr('width', cellB)
        .attr('height', height)
        .classed('cellB', true)
    cellLines.append('rect')
        .attr('y', (cellS + cellB) * i)
        .attr('width', height)
        .attr('height', cellB)
        .classed('cellB', true)
}

function formatId(s) {
    return (isNaN(s.substring(0, 1)) ? '' : '_') + s.replace(/\s/g, '')
}

const gameTypeG = svg.append('g').attr('id', 'gameType')
const gameTypes = ['4Max MTT'] // '6Max Cash'
const stackDepthG = svg.append('g').attr('id', 'stackDepth')
const stackDepths = ['100', '80', '60', '50', '40', '35', '30', '25', '20', '17', '14', '12', '10']
const actionsG = svg.append('g').attr('id', 'action')
const actions = ['CO', 'BU', 'SB', 'SBcBB']
const positions = ['CO', 'BU', 'SB', 'BB']
var rangeInfo = {
    'gameType': formatId(gameTypes[0]),
    'stackDepth': formatId(stackDepths[0]),
    'action': formatId(actions[0])
}

const buttonP = cellsW / 50
const buttonH = cellsW / 20
const buttonGW = width - cellsW - buttonP * 2

function applyHover(sel, click = () => {}, over = () => {}, out = () => {}) {
    sel
        .on('mouseover', function() {
            over(this)
            d3.selectAll(this.children).classed('hover', true)
        })
        .on('mouseout', function() {
            out(this)
            d3.selectAll(this.children).classed('hover', false)
        })
        .on('click', function() {
            click(this)
            if (mobile) {
                setTimeout(() => {
                    d3.selectAll(this.children).classed('hover', false)
                }, mobileClickMs);
            }
        })
}
applyHover(d3.selectAll('.cellG'), (g) => clickHand(g), (g) => hoverHand(g), displayRangeFreqs)

function select(g) {
    d3.select(g.parentNode).selectAll('*').selectAll('*').classed('selected', false)
    d3.selectAll(g.children).classed('selected', true)
}

var prevRangeInfo = {}
prevRangeInfo = JSON.parse(JSON.stringify(rangeInfo))
function createButtons(bg, bs, id, row) {
    for (let i = 0; i < bs.length; i++) {
        let g = bg.append('g')
            .attr('transform', 'translate(' + (cellsW + buttonP) + ',' + (buttonP + buttonH * row) + ')')
            .classed('buttonG', true)
            .attr('id', formatId(bs[i]))
        let w = buttonGW / bs.length
        let x = w * i
        g.append('rect')
            .attr('x', x)
            .attr('width', w)
            .attr('height', buttonH)
            .classed('button', true)
        g.append('text')
            .attr('x', x + w / 2)
            .attr('y', buttonH * 0.65)
            .text(bs[i])
    }
    applyHover(d3.select('#' + id).selectAll('g'), (g) => {
        select(g)
        if (id === 'action') {
            rangeInfo[id] = actions[positions.indexOf(d3.select(g).attr('id'))]
        } else {
            rangeInfo[id] = d3.select(g).attr('id')
        }
        updateRange()
        prevRangeInfo = JSON.parse(JSON.stringify(rangeInfo))
    }, (g) => {
        if (id === 'action') {
            rangeInfo[id] = actions[positions.indexOf(d3.select(g).attr('id'))]
        } else {
            rangeInfo[id] = d3.select(g).attr('id')
        }
        updateRange()
        displayRangeFreqs()
    }, () => {
        rangeInfo = JSON.parse(JSON.stringify(prevRangeInfo))
        updateRange()
        displayRangeFreqs()
    })
    select(document.getElementById(formatId(bs[0])))
    updateRange()
}

function displayRangeFreqs() {
    let sumFreqs = {}
    for (act of Object.keys(currentRange[0][0])) {
        sumFreqs[act] = 0
    }
    iterCells((i, j) => {
        for (act of Object.keys(currentRange[i][j])) {
            sumFreqs[act] += currentRange[i][j][act] / (13 * 13)
        }
    })
    acts = sortActions(Object.keys(sumFreqs))
    actStrArr = []
    for (act of acts) {
        actStrArr.push(parseAction(act) + ': ' + Math.round(sumFreqs[act] * 100) / 100)
    }
    displayActionFreqs(actStrArr)
}

createButtons(gameTypeG, gameTypes, 'gameType', 0)
createButtons(stackDepthG, stackDepths, 'stackDepth', 1)
createButtons(actionsG, positions, 'action', 2.5)

const rollText = svg.append('text')
    .attr('x', cellsW + buttonP)
    .attr('y', height - buttonP * 1.5)
    .classed('textLeft', true)
    .classed('bigText', true)
    .attr('id', 'rollText')

const actionFreqs = svg.append('g').attr('id', 'actionFreqs')
displayRangeFreqs()

function parseGTOString(r) {
    let output = []
    for (let i = 0; i < 13; i++) {
        let row = []
        for (let j = 0; j < 13; j++) {
            row.push({})
        }
        output.push(row)
    }
    for (act in r) {
        let hands = r[act].split(',')
        let freq = 100
        for (hand of hands) {
            if (hand.substring(0, 1) === '[') {
                freq = parseFloat(hand.split(']')[0].substring(1))
                hand = hand.split(']')[1]
            }
            if (hand.split('[').length === 2) {
                hand = hand.split('[')[0]
            }
            let id = handToId(hand)
            output[id[0]][id[1]][act] = freq
        }
    }
    iterCells((i, j) => {
        let total = 0
        for (act in r) {
            let freq = output[i][j][act]
            if (freq === undefined) {
                output[i][j][act] = 0
            } else {
                total += freq
            }
        }
        output[i][j]['f'] = 100 - total
    })
    let hasFold = false
    iterCells((i, j) => {
        if (output[i][j]['f'] > 0.5) {
            hasFold = true
        }
    })
    if (!hasFold) {
        iterCells((i, j) => {
            delete output[i][j]['f']
        })
    }
    return output
}

function handToId(hand) {
    let id = [ranks.indexOf(hand.substring(0, 1)), ranks.indexOf(hand.substring(1, 2))]
    if (hand.substring(2, 3) === 'o') {
        let temp = id[0]
        id[0] = id[1]
        id[1] = temp
    }
    return id
}

function sortActions(acts) {
    let allIn = ''
    let raises = []
    let open = ''
    let call = false
    let check = false
    let fold = false
    let special = {}
    for (act of acts) {
        let first = act.substring(0, 1)
        if (first === 'a') {
            allIn = act
        } else if (first === 'r') {
            if (act.substring(1, 2) === 'B') {
                act = act.replace('B', '')
                special[act] = 'B'
            }
            raises.push(act)
        } else if (first === 'o') {
            open = act
        } else if (first === 'c') {
            call = true
        } else if (first === 'x') {
            check = true
        } else if (first === 'f') {
            fold = true
        }
    }
    let output = []
    if (allIn !== '') {
        output.push(allIn)
    }
    let raiseAmounts = []
    for (raise of raises) {
        raiseAmounts.push(parseFloat(raise.substring(1).replace('_', '.')))
    }
    raiseAmounts.sort((a,b) => {return b - a})
    for (raiseAmount of raiseAmounts) {
        let raiseStr = 'r' + raiseAmount.toString().replace('.', '_')
        if (special[raiseStr] !== undefined) {
            raiseStr = 'r' + special[raiseStr] + raiseStr.substring(1)
        }
        output.push(raiseStr)
    }
    if (open !== '') {
        output.push(open)
    }
    if (call) {
        output.push('c')
    }
    if (check) {
        output.push('x')
    }
    if (fold) {
        output.push('f')
    }
    return output
}

var currentRange;
function displayRange(r) {
    currentRange = r
    let acts = Object.keys(r[0][0])
    acts = sortActions(acts)
    iterCells((i, j) => {
        let cellG = d3.select('#cellG' + i + '-' + j)
        let totalFreq = 0
        for (act of acts) {
            cellG.append('rect')
                .attr('x', cellS * totalFreq / 100)
                .attr('width', cellS * r[i][j][act] / 100)
                .attr('height', cellS)
                .classed(act, true)
                .classed('cell', true)
            totalFreq += r[i][j][act]
        }
        cellG.select('text').raise()
    })
    d3.selectAll(condenseClasses(3)).classed('r-3', true)
    d3.selectAll(condenseClasses(2)).classed('r-2', true)
    d3.selectAll(condenseClasses(1)).classed('r-1', true)
    d3.selectAll(condenseClasses(0)).classed('r-0', true)
}

function updateRange() {
    d3.selectAll('.cell').remove()
    let gT = rangeInfo['gameType']
    let sD = parseInt(rangeInfo['stackDepth'].substring(1))
    let pos = rangeInfo['action']
    if (gT === '_4MaxMTT') {
        displayRange(parseGTOString(MTT4[sD][pos]))
    }
}

function parseAction(act) {
    switch (act.substring(0, 1)) {
        case 'f':
            act = 'Fold'
            break
        case 'x':
            act = 'Check'
            break
        case 'c':
            act = 'Call'
            break
        case 'o':
            act = 'Open ' + act.substring(1)
            break
        case 'r':
            act = 'Raise ' + act.substring(1)
            break
        case 'a':
            act = 'All In ' + act.substring(1)
            break
    }
    act = act.replace('_', '.')
    return act
}

function clickHand(g) {
    let rowCol = d3.select(g).attr('id').substring(5).split('-')
    let row = rowCol[0]
    let col = rowCol[1]
    let freqs = currentRange[row][col]
    let acts = Object.keys(freqs)
    let roll = Math.random() * 100
    let act;
    for (a of acts) {
        act = a
        if (roll < freqs[a]) {
            break
        }
        roll -= freqs[a]
    }
    act = parseAction(act)
    roll = Math.floor(roll)
    if (roll < 10) {
        roll = '0' + roll
    }
    displayActionFreqs()
    rollText.text(roll + ': ' + act)
}

function hoverHand(g) {
    let rowCol = d3.select(g).attr('id').substring(5).split('-')
    let row = rowCol[0]
    let col = rowCol[1]
    let freqs = currentRange[row][col]
    let acts = Object.keys(freqs)
    acts = sortActions(acts)
    let actStrings = []
    for (a of acts) {
        actStrings.push(parseAction(a) + ': ' + freqs[a])
    }
    displayActionFreqs(actStrings)
}

function displayActionFreqs(acts) {
    rollText.text('')
    d3.selectAll('.actionFreq').remove()
    if (acts === undefined) {
        return
    }
    let y = height - cellS / 2
    for (act of acts) {
        let a = act.split(': ')[0]
        let num = act.split(': ')[1]
        let g = actionFreqs.append('g').classed('actionFreq', true)
        applyTextColor(g.append('text')
            .attr('x', cellsW + buttonP)
            .attr('y', y)
            .classed('textLeft', true)
            .classed('bigText', true)
            .text(a.replace('B', '')), a)
        g.append('rect')
            .attr('x', cellsW + buttonP)
            .attr('y', y - cellS)
            .attr('width', width - cellsW - cellS * 3)
            .attr('height', cellS)
            .style('fill', 'hsla(0, 0%, 0%, 0)')
            .on('mouseover', function() {
                highlight(this)
            })
            .on('mouseout', function() {
                highlight(this, true)
            })
        g.append('text')
            .attr('x', width - buttonP)
            .attr('y', y)
            .classed('textRight', true)
            .classed('bigText', true)
            .text(num)
        y -= cellS
    }
}

const colorClasses = ['f', 'x', 'c', 'r-0', 'r-1', 'r-2', 'r-3']
function highlight(rect, out = false) {
    if (out) {
        d3.selectAll('*').classed('hidden', false)
        return
    }
    hiClass = d3.select(rect.parentNode.children[0]).attr('class').split(' ')[2]
    for (c of colorClasses) {
        if (c !== hiClass) {
            d3.selectAll('.' + c).classed('hidden', true)
        }
    }
}

function applyTextColor(t, a) {
    let color = ''
    switch (a) {
        case 'Fold':
            color = 'f'
            break
        case 'Check':
            color = 'x'
            break
        case 'Call':
            color = 'c'
            break
        default:
            let firstWord = a.split(' ')[0]
            if (firstWord === 'All') {
                color = 'r-3'
            } else if (firstWord === 'Open') {
                color = 'r-1'
            } else { // firstWord === 'Raise'
                let r = 'r' + a.split(' ')[1].replace('.', '_')
                for (let i = 0; i < 3; i++) {
                    if (actionColors['r-' + i].includes(r)) {
                        color = 'r-' + i
                    }
                }
            }
    }
    t.classed(color, true)
}