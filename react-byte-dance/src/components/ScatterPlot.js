import React, {
    Component
} from 'react';
import * as d3 from "d3";

class ScatterPlot extends Component {

    componentDidMount() {
        var svg = d3.select("#canvas");
        // Margin setup
        var margin = { top: 10, right: 10, bottom: 50, left: 50 };
        var width = +svg.attr("width") - margin.left - margin.right;
        var height = +svg.attr("height") - margin.top - margin.bottom;

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // Scales
        var x = d3.scaleLinear()
            .range([0, width]);
        var y = d3.scaleLinear()
            .range([height, 0]);
        // Axes
        var xAxisCall = d3.axisBottom(x)
        var xAxis = g.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(" + 0 + "," + height + ")");
        var yAxisCall = d3.axisLeft(y)
        var yAxis = g.append("g")
            .attr("class", "y-axis");
        // Labels
        xAxis.append("text")
            .attr("class", "axis-title")
            .attr("transform", "translate(" + width + ", 0)")
            .attr("y", -6)
            .text("Grade Point Average")
        yAxis.append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 16)
            .text("Height / Centimeters");
        var flag = true;

        var data = this.props.data0;

        var t = d3.transition().duration(750);
        // Update our scales
        x.domain([d3.min(data, function (d) { return d.gpa; }) / 1.05,
        d3.max(data, function (d) { return d.gpa; }) * 1.05])
        y.domain([d3.min(data, function (d) { return d.height; }) / 1.05,
        d3.max(data, function (d) { return d.height; }) * 1.05])
        // Standard transition for our visualization
        var t = d3.transition().duration(750);
        // Update our axes
        xAxis.transition(t).call(xAxisCall);
        yAxis.transition(t).call(yAxisCall);
        // Update our circles
        var circles = g.selectAll("circle")
            .data(data);
        circles.exit().transition(t)
            .attr("fill-opacity", 0.1)
            .attr("cy", y(0))
            .remove()
        circles.transition(t)
            .attr("cx", function (d) { return x(d.gpa) })
            .attr("cy", function (d) { return y(d.height) })
        circles.enter().append("circle")
            .attr("cx", function (d) { return x(d.gpa) })
            .attr("cy", y(0))
            .attr("r", 5)
            .attr("fill", "grey")
            .attr("fill-opacity", 0.1)
            .transition(t)
            .attr("fill-opacity", 1)
            .attr("cy", function (d) { return y(d.height) });
    }

    

    render() {
        
        return (
            <svg id="canvas" width={this.props.width} height={this.props.height}></svg>           
        );
    }
}

export default ScatterPlot;