var bluBlue = "#3af";
var bluGreen = "#af3";
var bluGreenLine = "#99e62e";
var bluOrange = "#f28c28";
var black = "#000";
var bluYFlipped = flipY(bluY);

// Make this not delete and create every element each frame
function drawBlu() {
    bluYFlipped = flipY(bluY);

    // Blu Orange Tip
    (d3.select("#bluOrangeTip").node()
        ? d3.select("#bluOrangeTip")
        : svg.append("ellipse"))
        .attr("id", "bluOrangeTip")
        .attr("class", "blu")
        .style("fill", bluOrange)
        .attr("cx", bluX)
        .attr("cy", bluYFlipped - bluRY)
        .attr("rx", bluRX / 16)
        .attr("ry", bluRY / 8);
    
    // Blu Main Body
    (d3.select("#bluMainBody").node()
        ? d3.select("#bluMainBody")
        : svg.append("ellipse"))
        .attr("id", "bluMainBody")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("cx", bluX)
        .attr("cy", bluYFlipped)
        .attr("rx", bluRX)
        .attr("ry", bluRY);

    (d3.select("#bluBottomLeft").node()
        ? d3.select("#bluBottomLeft")
        : svg.append("ellipse"))
        .attr("id", "bluBottomLeft")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("cx", bluX - bluRX / 2)
        .attr("cy", bluYFlipped + bluRY / 2)
        .attr("rx", bluRX / 2)
        .attr("ry", bluRY / 2);

    (d3.select("#bluBottomRight").node()
        ? d3.select("#bluBottomRight")
        : svg.append("ellipse"))
        .attr("id", "bluBottomRight")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("cx", bluX + bluRX / 2)
        .attr("cy", bluYFlipped + bluRY / 2)
        .attr("rx", bluRX / 2)
        .attr("ry", bluRY / 2);

    (d3.select("#bluBottom").node()
        ? d3.select("#bluBottom")
        : svg.append("rect"))
        .attr("id", "bluBottom")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("x", bluX - bluRX)
        .attr("y", bluYFlipped)
        .attr("width", bluRX * 2)
        .attr("height", bluRY / 2);

    // Blu Green Spot
    (d3.select("#bluGreenSpot").node()
        ? d3.select("#bluGreenSpot")
        : svg.append("ellipse"))
        .attr("id", "bluGreenSpot")
        .attr("class", "blu")
        .style("fill", bluGreen)
        .attr("cx", bluX)
        .attr("cy", bluYFlipped + bluRY / 2)
        .attr("rx", bluRX * 5/8)
        .attr("ry", bluRY * 7/16);

    (d3.select("#bluGreenSpotBottomLeft").node()
        ? d3.select("#bluGreenSpotBottomLeft")
        : svg.append("path"))
        .attr("id", "bluGreenSpotBottomLeft")
        .attr("class", "blu")
        .style("fill", bluGreen)
        .attr("transform", "translate(" + bluX + ", " + (bluYFlipped + bluRY / 2) + ") scale(" + 1 + "," + (bluRY / bluRX * 5/4) + ")")
        .attr("d", d3.arc()
            .innerRadius(0)
            .outerRadius(bluRX * 5/8)
            .startAngle(-Math.PI / 2)
            .endAngle(-Math.PI * 11/16)
        );

    (d3.select("#bluGreenSpotBottomRight").node()
        ? d3.select("#bluGreenSpotBottomRight")
        : svg.append("path"))
        .attr("id", "bluGreenSpotBottomRight")
        .attr("class", "blu")
        .style("fill", bluGreen)
        .attr("transform", "translate(" + bluX + ", " + (bluYFlipped + bluRY / 2) + ") scale(" + 1 + "," + (bluRY / bluRX * 5/4) + ")")
        .attr("d", d3.arc()
            .innerRadius(0)
            .outerRadius(bluRX * 5/8)
            .startAngle(Math.PI / 2)
            .endAngle(Math.PI * 11/16)
        );

    (d3.select("#bluGreenSpotBottom").node()
        ? d3.select("#bluGreenSpotBottom")
        : svg.append("rect"))
        .attr("id", "bluGreenSpotBottom")
        .attr("class", "blu")
        .style("fill", bluGreen)
        .attr("x", bluX - bluRX / 2)
        .attr("y", bluYFlipped + bluRY * 3/4)
        .attr("width", bluRX)
        .attr("height", bluRY * 1/8);

    // Blu Green Line
    (d3.select("#bluGreenLine").node()
        ? d3.select("#bluGreenLine")
        : svg.append("rect"))
        .attr("id", "bluGreenLine")
        .attr("class", "blu")
        .style("fill", bluGreenLine)
        .attr("x", bluX - bluRX / 32)
        .attr("y", bluYFlipped + bluRY / 2)
        .attr("width", bluRX / 16)
        .attr("height", bluRY / 2);

    (d3.select("#bluGreenLineTip").node()
        ? d3.select("#bluGreenLineTip")
        : svg.append("ellipse"))
        .attr("id", "bluGreenLineTip")
        .attr("class", "blu")
        .style("fill", bluGreenLine)
        .attr("cx", bluX)
        .attr("cy", bluYFlipped + bluRY / 2)
        .attr("rx", bluRX / 32)
        .attr("ry", bluRY / 32);

    // Cover bottom part of green spot
    (d3.select("#bluGreenSpotInnerCover").node()
        ? d3.select("#bluGreenSpotInnerCover")
        : svg.append("rect"))
        .attr("id", "bluGreenSpotInnerCover")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("x", bluX - bluRX * 2/3)
        .attr("y", bluYFlipped + bluRY * 7/8)
        .attr("width", bluRX * 4/3)
        .attr("height", bluRY * 1/16);

    (d3.select("#bluGreenSpotOuterCover").node()
        ? d3.select("#bluGreenSpotOuterCover")
        : svg.append("rect"))
        .attr("id", "bluGreenSpotOuterCover")
        .attr("class", "blu")
        .style("fill", bluBlue)
        .attr("x", bluX - bluRX / 2)
        .attr("y", bluYFlipped + bluRY * 7/8)
        .attr("width", bluRX)
        .attr("height", bluRY * 1/8);

    // Blu Eyes
    (d3.select("#bluLeftEye").node()
        ? d3.select("#bluLeftEye")
        : svg.append("ellipse"))
        .attr("id", "bluLeftEye")
        .attr("class", "blu")
        .style("fill", black)
        .attr("cx", bluX - bluRX * 13/32)
        .attr("cy", bluYFlipped - bluRY * 13/32)
        .attr("rx", bluRX / 8)
        .attr("ry", bluRY / 8);

    (d3.select("#bluRightEye").node()
        ? d3.select("#bluRightEye")
        : svg.append("ellipse"))
        .attr("id", "bluRightEye")
        .attr("class", "blu")
        .style("fill", black)
        .attr("cx", bluX + bluRX * 13/32)
        .attr("cy", bluYFlipped - bluRY * 13/32)
        .attr("rx", bluRX / 8)
        .attr("ry", bluRY / 8);

    // Blu Mouth
    (d3.select("#bluMouth").node()
        ? d3.select("#bluMouth")
        : svg.append("path"))
        .attr("id", "bluMouth")
        .attr("class", "blu")
        .style("fill", black)
        .attr("transform", "translate(" + bluX + ", " + (bluYFlipped - bluRY / 3) + ") scale(" + 1 + "," + (bluRY / bluRX) + ")")
        .attr("d", d3.arc()
            .innerRadius(bluRX / 5)
            .outerRadius(bluRX / 4)
            .startAngle(Math.PI * 3/4)
            .endAngle(Math.PI * 5/4)
        );

    (d3.select("#bluMouthLeftTip").node()
        ? d3.select("#bluMouthLeftTip")
        : svg.append("ellipse"))
        .attr("id", "bluMouthLeftTip")
        .attr("class", "blu")
        .style("fill", black)
        .attr("cx", bluX - bluRX * 9/40 * Math.sqrt(2) / 2)
        .attr("cy", bluYFlipped + bluRY * (-1/3 + 9/40 * Math.sqrt(2) / 2))
        .attr("rx", bluRX / 40)
        .attr("ry", bluRY / 40);

    (d3.select("#bluMouthRightTip").node()
        ? d3.select("#bluMouthRightTip")
        : svg.append("ellipse"))
        .attr("id", "bluMouthRightTip")
        .attr("class", "blu")
        .style("fill", black)
        .attr("cx", bluX + bluRX * 9/40 * Math.sqrt(2) / 2)
        .attr("cy", bluYFlipped + bluRY * (-1/3 + 9/40 * Math.sqrt(2) / 2))
        .attr("rx", bluRX / 40)
        .attr("ry", bluRY / 40);
}

drawBlu();