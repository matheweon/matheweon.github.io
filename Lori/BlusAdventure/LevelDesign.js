var gameTileWidth = Math.ceil(gameWidth / bluRad);
var gameTileHeight = Math.ceil(gameWidth / bluRad);
var dirtPixelation = 4;
var grass = "#31ab1f";
var grassVariation = 16;
var dirtDark = "#623f00";
var dirtLight = "#9b6200";
var dirtVariation = 6;

var level = svg.append("g").attr("id", "level");

function tileToCoord(tile, isY) {
    if (isY) return flipY((tile + 1) * bluRad);
    return tile * bluRad;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function RGBToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}
function randomizeComponent(comp, variation) {
    return Math.min(Math.max(comp + Math.round(Math.random() * variation * 2 - variation), 0), 255);
}

function varyColor(hex, variation) {
    let newR = randomizeComponent(hexToRGB(hex).r, variation);
    let newG = randomizeComponent(hexToRGB(hex).g, variation);
    let newB = randomizeComponent(hexToRGB(hex).b, variation);
    return RGBToHex(newR, newG, newB);
}

for (let i = 0; i < 100; i++) {
    let newGrass = varyColor(grass, grassVariation);
    let grassGradient = svg.append("defs").append("linearGradient")
        .attr("id", "grassGradient" + i)
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%"); // Vertical linear gradient
    grassGradient.append("stop")
        .attr("offset", "0%")
        .style("stop-color", newGrass)
        .style("stop-opacity", 1);
    grassGradient.append("stop")
        .attr("offset", "25%")
        .style("stop-color", newGrass)
        .style("stop-opacity", 1);
    grassGradient.append("stop")
        .attr("offset", "100%")
        .style("stop-color", newGrass)
        .style("stop-opacity", 0);
}

d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};
var levelEditorGridState = 0;
var levelEditorGrid = svg.append("g").attr("id", "levelEditorGrid").attr("class", "levelEditorGrid");
function drawLevelEditorGrid(keyDown) {
    if (levelEditorGridState === 0 && keyDown) {
        levelEditorGrid.moveToFront();
        for (let i = 0; i < gameWidth; i += bluRad) {
            levelEditorGrid.append("rect")
                .attr("class", "levelEditorGrid")
                .attr("x", i)
                .attr("y", 0)
                .attr("width", 1)
                .attr("height", gameHeight);
        }
        for (let i = 0; i < gameHeight; i += bluRad) {
            levelEditorGrid.append("rect")
                .attr("class", "levelEditorGrid")
                .attr("x", 0)
                .attr("y", flipY(i))
                .attr("width", gameWidth)
                .attr("height", 1);
        }
        for (let i = 0; i < gameTileWidth; i++) {
            for (let j = 0; j < gameTileHeight; j++) {
                levelEditorGrid.append("text")
                    .attr("class", "levelEditorGrid")
                    .attr("x", i * bluRad + 1)
                    .attr("y", flipY(j * bluRad + 23))
                    .text(d => i);
                levelEditorGrid.append("text")
                    .attr("class", "levelEditorGrid")
                    .style("text-align", "right")
                    .attr("x", i * bluRad + 26 - 6 * Math.floor(Math.log10(j ? j : 1)))
                    .attr("y", flipY(j * bluRad + 1))
                    .text(d => j);
            }
        }
        levelEditorGridState++;
    } else if (levelEditorGridState === 1 && !keyDown) {
        levelEditorGridState++;
    } else if (levelEditorGridState === 2 && keyDown) {
        d3.select("#levelEditorGrid").selectAll("*").remove()
        levelEditorGridState++;
    } else if (levelEditorGridState === 3 && !keyDown) {
        levelEditorGridState = 0;
    }
}

function createDirtBlock(x, y) {
    x = tileToCoord(x);
    y = tileToCoord(y, true);

    let block = level.append("g")
        .attr("class", "block")
        .attr("width", bluRad)
        .attr("height", bluRad)
        .attr("x", x)
        .attr("y", y);
    
    for (let i = 0; i < dirtPixelation; i++) {
        for (let j = 0; j < dirtPixelation; j++) {
            if ((i + j) % 2 === 0) {
                block.append("rect")
                    .attr("fill", varyColor(dirtLight, dirtVariation))
                    .attr("width", bluRad / dirtPixelation)
                    .attr("height", bluRad / dirtPixelation)
                    .attr("x", x + bluRad / dirtPixelation * i)
                    .attr("y", y + bluRad / dirtPixelation * j);
            }
        }
    }

    for (let i = 0; i < dirtPixelation; i++) {
        for (let j = 0; j < dirtPixelation; j++) {
            if ((i + j) % 2 === 1) {
                block.append("rect")
                    .attr("fill", varyColor(dirtDark, dirtVariation))
                    .attr("width", bluRad / dirtPixelation)
                    .attr("height", bluRad / dirtPixelation)
                    .attr("x", x + bluRad / dirtPixelation * i)
                    .attr("y", y + bluRad / dirtPixelation * j);
            }
        }
    }

    return block;
}

function createGrassBlock(x, y) {
    let block = createDirtBlock(x, y);
    x = tileToCoord(x);
    y = tileToCoord(y, true);

    for (let i = 0; i < dirtPixelation; i++) {
        block.append("rect")
            .style("fill", "url(#grassGradient" + Math.floor(Math.random() * 100) + ")")
            .attr("width", bluRad / 4)
            .attr("height", bluRad * 3/4)
            .attr("x", x + i / 4 * bluRad)
            .attr("y", y);
    }

    return block;
}

function create2x2GrassBlock(x, y) {
    createGrassBlock(x, y);
    createGrassBlock(x + 1, y);
    createDirtBlock(x, y - 1);
    createDirtBlock(x + 1, y - 1);
}

function replaceBlock(x, y, createBlockFunction) {
    d3.selectAll(".block").each(function(d) {
        let blockX = d3.select(this).attr("x");
        let blockY = d3.select(this).attr("y");
        if (blockX == tileToCoord(x) && blockY == tileToCoord(y, true)) {
            d3.select(this).remove();
        }
    });
    createBlockFunction(x, y);
}

function createLevel(level) {
    switch (level) {
        case 1:
            for (let i = 0; i < gameTileWidth; i++) {
                createGrassBlock(i, 1);
                createDirtBlock(i, 0);
            }
            let x = 4;
            let y = 3;
            while (x < gameTileWidth && y < gameTileHeight) {
                create2x2GrassBlock(x, y);
                x += 4;
                y += 2;
            }
            replaceBlock(4, 1, createDirtBlock);
            replaceBlock(5, 1, createDirtBlock);
            break;
    }
}

createLevel(1);