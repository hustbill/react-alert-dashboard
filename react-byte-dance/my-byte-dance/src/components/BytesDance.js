import React, {
  Component
} from 'react';
import * as d3 from "d3";

class BytesDance extends Component {
  constructor(props) {
    super(props);
    this.timer = 0;

    this.state = {
      data: "abcdefghijklmnopqrstuvwxyz".split(""),
      count: 0,
      timer: new Date()
    }
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        time: new Date()
      });
    }, Math.floor(Date.now() / 1000) * 1000 + 1000 - Date.now());
    var balls = this.generateBallsWithLabel();
  }

  componentDidUpdate() {
    

  }

  generateBallsWithLabel() {
    var width = 960,
      height = 500;

    var svg = d3.select("#drawArea").append("svg")
      .attr("width", width)
      .attr("height", height)

    var json = {
      "nodes": [{
        "x": 80,
        "r": 30,
        "color": "red",
        "label": "Node1"
      }, {
        "x": 200,
        "r": 45,
          "color": "yellow",
        "label": "Node2"
      }, {
        "x": 380,
        "r": 60,
          "color": "green",
        "label": "Node3"
      }]
    };

    /* Define the data for the circles */
    var elem = svg.selectAll("g")
      .data(json.nodes)

    /*Create and place the "blocks" containing the circle and the text */
    var elemEnter = elem.enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + d.x + ",80)"
      })

    /*Create the circle for each block */
    var circle = elemEnter.append("circle")
      .attr("r", function (d) {
        return d.r
      })
      .attr("stroke", "black")      
      .attr("fill", function (d) {
        return d.color
      });

    /* Create the text for each block */
    elemEnter.append("text")
      .attr("dx", function (d) {
        return -20
      })
      .text(function (d) {
        return d.label
      })
    
    return circle;
  }

  render() {
    var data = this.state.timer.toLocaleTimeString();
    // var balls = this.generateBallsWithLabel();
    var drawAreaStyle = {
      "width": 960,
      "height":  500,      
      "border": "1px solid grey"
    }
    return (
      <div id="drawArea" style={drawAreaStyle}>
        <h1> Ball Bounce Randomly </h1>
        <div ref="canvas" > {data} </div>            
      </div>
    );
  }
}



export default BytesDance;