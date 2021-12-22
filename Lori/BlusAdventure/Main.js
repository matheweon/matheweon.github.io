var bluBlue = "#3af";
var bluGreen = "#af3";
var bluGreenLine = "#99e62e";
var bluOrange = "#f28c28";
var black = "#000"
var bluX = 400;
var bluY = 400;
var bluSize = 250;
var bluRX = bluSize;
var bluRY = bluSize;
var bounceFrame = 0;

var svg = d3.select("body")
    .append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

function drawBlu() {
    d3.selectAll(".blu").remove();

    // Blu Orange Tip
    svg.append("ellipse")
        .attr("class", "blu")
        .style("fill", bluOrange)
        .attr("cx", bluX)
        .attr("cy", bluY - bluRY)
        .attr("rx", bluRX / 16)
        .attr("ry", bluRY / 8);

    // Blu Main Body
    svg.append("ellipse")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("cx", bluX)
        .attr("cy", bluY)
        .attr("rx", bluRX)
        .attr("ry", bluRY);

    svg.append("ellipse")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("cx", bluX - bluRX / 2)
        .attr("cy", bluY + bluRY / 2)
        .attr("rx", bluRX / 2)
        .attr("ry", bluRY / 2);

    svg.append("ellipse")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("cx", bluX + bluRX / 2)
        .attr("cy", bluY + bluRY / 2)
        .attr("rx", bluRX / 2)
        .attr("ry", bluRY / 2);

    svg.append("rect")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("x", bluX - bluRX)
        .attr("y", bluY)
        .attr("width", bluRX * 2)
        .attr("height", bluRY / 2)

    // Blu Green Spot
    svg.append("ellipse")
        .attr("class", "blu")
        .style("fill", bluGreen)
        .attr("cx", bluX)
        .attr("cy", bluY + bluRY / 2)
        .attr("rx", bluRX * 5/8)
        .attr("ry", bluRY * 7/16);

    svg.append("path")
        .attr("class", "blu")
        .style("fill", bluGreen)
        .attr("transform", "translate(" + bluX + ", " + (bluY + bluRY / 2) + ") scale(" + 1 + "," + (bluRY / bluRX * 5/4) + ")")
        .attr("d", d3.arc()
            .innerRadius(0)
            .outerRadius(bluRX * 5/8)
            .startAngle(Math.PI / 2)
            .endAngle(Math.PI * 11/16)
        );

    svg.append("path")
        .attr("class", "blu")
        .style("fill", bluGreen)
        .attr("transform", "translate(" + bluX + ", " + (bluY + bluRY / 2) + ") scale(" + 1 + "," + (bluRY / bluRX * 5/4) + ")")
        .attr("d", d3.arc()
            .innerRadius(0)
            .outerRadius(bluRX * 5/8)
            .startAngle(-Math.PI / 2)
            .endAngle(-Math.PI * 11/16)
        );

    svg.append("rect")
        .attr("class", "blu")
        .style("fill", bluGreen)
        .attr("x", bluX - bluRX / 2)
        .attr("y", bluY + bluRY * 3/4)
        .attr("width", bluRX)
        .attr("height", bluRY * 1/8)

    // Blu Green Line
    svg.append("rect")
        .attr("class", "blu")
        .style("fill", bluGreenLine)
        .attr("x", bluX - bluRX / 32)
        .attr("y", bluY + bluRY / 2)
        .attr("width", bluRX / 16)
        .attr("height", bluRY / 2)

    svg.append("ellipse")
        .attr("class", "blu")
        .style("fill", bluGreenLine)
        .attr("cx", bluX)
        .attr("cy", bluY + bluRY / 2)
        .attr("rx", bluRX / 32)
        .attr("ry", bluRY / 32);

    // Cover bottom part of green spot
    svg.append("rect")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("x", bluX - bluRX * 2/3)
        .attr("y", bluY + bluRY * 7/8)
        .attr("width", bluRX * 4/3)
        .attr("height", bluRY * 1/16)

    svg.append("rect")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("x", bluX - bluRX / 2)
        .attr("y", bluY + bluRY * 7/8)
        .attr("width", bluRX)
        .attr("height", bluRY * 1/8)

    // Blu Eyes
    svg.append("ellipse")
        .attr("class", "blu")
        .style("fill", black)
        .attr("cx", bluX - bluRX * 13/32)
        .attr("cy", bluY - bluRY * 13/32)
        .attr("rx", bluRX / 8)
        .attr("ry", bluRY / 8);

    svg.append("ellipse")
        .attr("class", "blu")
        .style("fill", black)
        .attr("cx", bluX + bluRX * 13/32)
        .attr("cy", bluY - bluRY * 13/32)
        .attr("rx", bluRX / 8)
        .attr("ry", bluRY / 8);

    // Blu Mouth
    svg.append("path")
        .attr("class", "blu")
        .style("fill", black)
        .attr("transform", "translate(" + bluX + ", " + (bluY - bluRY / 3) + ") scale(" + 1 + "," + (bluRY / bluRX) + ")")
        .attr("d", d3.arc()
            .innerRadius(bluRX / 5)
            .outerRadius(bluRX / 4)
            .startAngle(Math.PI * 3/4)
            .endAngle(Math.PI * 5/4)
        );

    svg.append("ellipse")
        .attr("class", "blu")
        .style("fill", black)
        .attr("cx", bluX + bluRX * 9/40 * Math.sqrt(2) / 2)
        .attr("cy", bluY + bluRY * (-1/3 + 9/40 * Math.sqrt(2) / 2))
        .attr("rx", bluRX / 40)
        .attr("ry", bluRY / 40);

    svg.append("ellipse")
        .attr("class", "blu")
        .style("fill", black)
        .attr("cx", bluX - bluRX * 9/40 * Math.sqrt(2) / 2)
        .attr("cy", bluY + bluRY * (-1/3 + 9/40 * Math.sqrt(2) / 2))
        .attr("rx", bluRX / 40)
        .attr("ry", bluRY / 40);
}

function bounce() {
    bluRX = bluSize * (1 + Math.sin(bounceFrame * 2 * Math.PI) / 8);
    bluRY = bluSize * (1 - Math.sin(bounceFrame * 2 * Math.PI) / 8);
    drawBlu();
    bounceFrame = Math.round(bounceFrame * 100 + 1) / 100;
    bounceFrame %= 1;
}

//setInterval(bounce, 50);

drawBlu();