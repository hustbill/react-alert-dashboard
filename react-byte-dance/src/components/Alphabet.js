import React, {
    Component
} from 'react';
import * as d3 from "d3";

import './Alphabet.css';

class Alphabet extends Component {
    constructor(props) {
        super(props);
        this.timer = 0;
    }
    componentDidMount() {
        const svg = d3.select("#canvas"),
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")");
        
        this.setState({
            g
        });
       
    }

    drawChart(data) {
        var t = d3.transition()
            .duration(750);

        // JOIN new data with old elements.
        var text = this.state.g.selectAll("text")
            .data(data, function (d) { return d; });

        // EXIT old elements not present in new data.
        text.exit()
            .attr("class", "exit")
            .transition(t)
            .attr("y", 60)
            .style("fill-opacity", 1e-6)
            .remove();

        // UPDATE old elements present in new data.
        text.attr("class", "update")
            .attr("y", 0)
            .style("fill-opacity", 1)
            .transition(t)
            .attr("x", function (d, i) { return i * 32; });

        // ENTER new elements present in new data.
        text.enter().append("text")
            .attr("class", "enter")
            .attr("dy", ".35em")
            .attr("y", -60)
            .attr("x", function (d, i) { return i * 32; })
            .style("fill-opacity", 1e-6)
            .text(function (d) { return d; })
            .transition(t)
            .attr("y", 0)
            .style("fill-opacity", 1);
    }

    componentDidUpdate() {
        this.drawChart(this.props.data);
    }

    render() {
        return (
            <div>
                <svg id="canvas" data={this.props.data} width={this.props.width} height={this.props.height}></svg>
            </div>
        );
    }
}

export default Alphabet;