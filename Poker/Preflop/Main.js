// Create elements in svg
const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
//const mobileClickMs = 100
const height = window.innerHeight
const width = window.innerWidth
const root = document.querySelector(':root')
const stdTextSize = height / 50
root.style.setProperty('--textSize', stdTextSize + 'px')
root.addEventListener('dblclick', function(e) {
    e.preventDefault()
})
const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const cellB = 2
const cellS = Math.floor((height - 14 * cellB) / 13)

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

function parseGTOString(range) {
    let output = []
    for (let i = 0; i < 13; i++) {
        let row = []
        for (let j = 0; j < 13; j++) {
            row.push({})
        }
        output.push(row)
    }
    for (action in range) {
        let hands = range[action].split(',')
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
            output[id[0]][id[1]][action] = freq
        }
    }
    iterCells((i, j) => {
        let total = 0
        for (action in range) {
            let freq = output[i][j][action]
            if (freq === undefined) {
                output[i][j][action] = 0
            } else {
                total += freq
            }
        }
        output[i][j]['f'] = 100 - total
    })
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

function displayRange(range) {
    let actions = Object.keys(range[0][0])
    iterCells((i, j) => {
        let cellG = d3.select('#cellG' + i + '-' + j)
        let totalFreq = 0
        for (action of actions) {
            cellG.append('rect')
                .attr('x', cellS * totalFreq / 100)
                .attr('width', cellS * range[i][j][action] / 100)
                .attr('height', cellS)
                .classed(action, true)
            totalFreq += range[i][j][action]
        }
        cellG.select('text').raise()
    })
}

displayRange(parseGTOString(MTT4[100]['CO']))