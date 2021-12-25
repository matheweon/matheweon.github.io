var grass = "#31ab1f";
var grassGradient = svg.append("defs").append("linearGradient")
    .attr("id", "grassGradient")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%"); // Vertical linear gradient
grassGradient.append("stop")
    .attr("offset", "0%")
    .style("stop-color", grass)
    .style("stop-opacity", 1);
grassGradient.append("stop")
    .attr("offset", "50%")
    .style("stop-color", grass)
    .style("stop-opacity", 1);
grassGradient.append("stop")
    .attr("offset", "100%")
    .style("stop-color", grass)
    .style("stop-opacity", 0);

function tileToCoord(tile, isY) {
    if (isY) return flipY((tile + 1) * bluRad);
    return tile * bluRad;
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
        for (let i = 0; i < window.innerWidth; i += bluRad) {
            levelEditorGrid.append("rect")
                .attr("class", "levelEditorGrid")
                .attr("x", i)
                .attr("y", 0)
                .attr("width", 1)
                .attr("height", window.innerHeight);
        }
        for (let i = 0; i < window.innerHeight; i += bluRad) {
            levelEditorGrid.append("rect")
                .attr("class", "levelEditorGrid")
                .attr("x", 0)
                .attr("y", flipY(i))
                .attr("width", window.innerWidth)
                .attr("height", 1);
        }
        for (let i = 0; i < window.innerWidth / bluRad; i++) {
            for (let j = 0; j < window.innerHeight / bluRad; j++) {
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

    let block = svg.append("g")
        .attr("class", "block")
        .attr("width", bluRad)
        .attr("height", bluRad)
        .attr("x", x)
        .attr("y", y);
    
    block.append("rect")
        .attr("class", "dirtLight")
        .attr("width", bluRad)
        .attr("height", bluRad)
        .attr("x", x)
        .attr("y", y);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if ((i + j) % 2 === 0) {
                block.append("rect")
                    .attr("class", "dirtDark")
                    .attr("width", bluRad / 4)
                    .attr("height", bluRad / 4)
                    .attr("x", x + bluRad / 4 * i)
                    .attr("y", y + bluRad / 4 * j);
            }
        }
    }

    return block;
}

function createGrassBlock(x, y) {
    x = tileToCoord(x);
    y = tileToCoord(y, true);

    let block = svg.append("g")
        .attr("class", "block")
        .attr("width", bluRad)
        .attr("height", bluRad)
        .attr("x", x)
        .attr("y", y);
    
    block.append("rect")
        .attr("class", "dirtLight")
        .attr("width", bluRad)
        .attr("height", bluRad)
        .attr("x", x)
        .attr("y", y);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if ((i + j) % 2 === 0) {
                block.append("rect")
                    .attr("class", "dirtDark")
                    .attr("width", bluRad / 4)
                    .attr("height", bluRad / 4)
                    .attr("x", x + bluRad / 4 * i)
                    .attr("y", y + bluRad / 4 * j);
            }
        }
    }

    block.append("rect")
        .attr("class", "grass")
        .attr("width", bluRad)
        .attr("height", bluRad / 2)
        .attr("x", x)
        .attr("y", y);

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
            for (let i = 0; i < window.innerWidth / bluRad; i++) {
                createGrassBlock(i, 1);
                createDirtBlock(i, 0);
            }
            create2x2GrassBlock(4, 3);
            create2x2GrassBlock(8, 5);
            create2x2GrassBlock(12, 7);
            create2x2GrassBlock(16, 9);
            create2x2GrassBlock(20, 11);
            replaceBlock(4, 1, createDirtBlock);
            replaceBlock(5, 1, createDirtBlock);
            break;
    }
}

createLevel(1);