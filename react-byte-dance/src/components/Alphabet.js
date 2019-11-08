import React, {
    Component
} from 'react';
import * as d3 from "d3";

import './Alphabet.css';

class Alphabet extends Component {
    constructor(props) {
        super(props);
        this.timer = 0;
     

        this.state = {
            alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
            magicNumber: 23,
            timer: new Date(),
            g: [],
        }
    }

    componentDidMount() {
        var svg = d3.select("#canvas"),
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")");       
        this.setState({          
            g
        });

        // Grab a random sample of letters from the alphabet, in alphabetical order.
        setInterval(
            () => this.randomMagicNumber(g),
            1500
        );
    }

    randomMagicNumber = (g) => {
         this.setState({
            alphabet: d3.shuffle(this.state.alphabet).slice(0, Math.floor(Math.random() * 26)).sort()
        });
    }

    update(data, g) {
        var t = d3.transition()
            .duration(750);

        // JOIN new data with old elements.
        var text = g.selectAll("text")
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
    };


    componentDidUpdate() {
       
        this.update(this.state.alphabet, this.state.g);
    }
    componentWillUnmount() {
        // clearInterval(this.timerId);
    }


    

    render() {
        return (
            <div>
                <svg id="canvas" width={this.props.width} height={this.props.height}></svg>
            </div>
                
            
        );
    }
}

export default Alphabet;