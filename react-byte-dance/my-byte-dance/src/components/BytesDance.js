import React, {
  Component
} from 'react';
import * as d3 from "d3";
import { defaultCipherList } from 'constants';

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

  tick() {
    var data = this.state.data;
    this.count++;
    data = data.reverse();
    data = data.concat + " , count: " + this.count;
    this.setState({ data });
  }

  componentDidMount() {
    // var data = this.state.data;
    // console.log('componentDidMount data: ' + data); 
    // data = data.concat('\n hello world');
    // this.setState({data});
    this.timer = setTimeout(() => {
      this.setState({
        time: new Date()
      });
    }, Math.floor(Date.now() / 1000) * 1000 + 1000 - Date.now());

  }

  componentDidUpdate() {


  }

  generateBallsWithLabel() {
    var nodesJSONData = {
      "nodes": [
        { "x": 80, "r": 40, "label": "Node 1" },
        { "x": 200, "r": 60, "label": "Node 2" },
        { "x": 380, "r": 80, "label": "Node 3" }
      ]
    };

    var width = 960,
      height = 500;

    var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)

    /* Define the data for the circles */
    var elem = svg.selectAll("g")
      .data(nodesJSONData.nodes)

    /*Create and place the "blocks" containing the circle and the text */
    var elemEnter = elem.enter()
      .append("g")
      .attr("transform", function (d) { return "translate(" + d.x + ",80)" })

    /*Create the circle for each block */
    var circle = elemEnter.append("circle")
      .attr("r", function (d) { return d.r })
      .attr("stroke", "black")
      .attr("fill", "white")

    /* Create the text for each block */
    elemEnter.append("text")
      .attr("dx", function (d) { return -20 })
      .text(function (d) { return d.label });


    return circle;
  }

  render() {
    var data = this.state.timer.toLocaleTimeString();
    var balls = this.generateBallsWithLabel();
    return (
      <div id="drawArea">
        <h1> Bytes dance randomly </h1>
        <div ref="canvas" > {data} </div>
        <div ref="BytesDance">
          
            </div>
      </div>
    );
  }
}



export default BytesDance;