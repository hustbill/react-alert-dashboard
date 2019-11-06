import React, {
  Component
} from 'react';
import * as d3 from "d3";
import { defaultCipherList } from 'constants';

class BytesDance extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: "abcdefghijklmnopqrstuvwxyz".split("")
      }
    }

    tick() {
         var data = this.state.data;
         d3.shuffle(data);
         this.setState({data});
        // if (this.state.data.length > 1) {
        //   this.setState({
        //     data: d3.shuffle(this.state.data)
        //       .slice(0, Math.floor(Math.random() * 26))
        //       .sort()
        //   });
        //   console.log('this.state.data.length' + this.state.data.length);
        // } else {
        //   console.log('this.state.data.length' + this.state.data.length);
        //   this.setState({
        //     data: "abcdefghijklmnopqrstuvwxyz".split("")
        //   });
        // }     
    }

    componentDidMount() {
      // this.timerID = setInterval(
      //   () => this.tick(), 
      //   1000
      // );
        const data = [2, 4, 2, 6, 8];
        this.drawBarChart(data);
       

        // Grab a random sample of letters from the alphabet, in alphabetical order.
        // d3.interval(function () {
        //   this.update(d3.shuffle(this.state.data)
        //     .slice(0, Math.floor(Math.random() * 26))
        //     .sort());
        // }, 1500);
    
          var array = [0, 1, 2, 3, 4, 5, 6];
          function shuffle(array) {
            d3.shuffle(array);
            console.log(array);
            return array;
          };
          array = shuffle(array);
         this.update(array);      
      
    }

      componentWillUnmount() {
        clearInterval(this.timerID);

      }

    componentDidUpdate() {
       var array = [0, 1, 2, 3, 4, 5, 6];
         d3.interval(function () {
           d3.shuffle(array);
           console.log(array);
         }, 1500);
         this.update(array);
      //  this.drawChart();
    }

    drawBarChart(data) {
      const canvasHeight = 400
      const canvasWidth = 600
      const scale = 20
      const svgCanvas = d3.select(this.refs.canvas)
        .append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)
        .style("border", "1px solid black")
      svgCanvas.selectAll("rect")
        .data(data).enter()
        .append("rect")
        .attr("width", 40)
        .attr("height", (datapoint) => datapoint * scale)
        .attr("fill", "orange")
        .attr("x", (datapoint, iteration) => iteration * 45)
        .attr("y", (datapoint) => canvasHeight - datapoint * scale)
      
        svgCanvas.selectAll("text")
          .data(data).enter()
          .append("text")
          .attr("x", (dataPoint, i) => i * 45 + 10)
          .attr("y", (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
          .text(dataPoint => dataPoint)
    }

    update(data) {
      const w = this.props.width;
      const h = this.props.height;

      // DATA JOIN
      // Join new data with old elements, if any.
      // var text = d3.select("svg").attr("transform", "translate(32," + (this.props.height / 2) + ")").selectAll("text")
      //   .data(data);

          // const svg = d3.select("body").append("svg"),
          const svgBytesDance = d3.select(this.refs.BytesDance).append("svg")
            .attr("width", w/2)
            .attr("hight", h/2)
            .append("g").attr("transform", "translate(32," + (h / 2) + ")");

      var text = svgBytesDance.attr("transform", "translate(32," + (40 / 2) + ")").selectAll("text")
        .data(data);

      // UPDATE
      // Update old elements as needed.
      // text.attr("class", "update");

      // ENTER
      // Create new elements as needed.
      //
      // ENTER + UPDATE
      // After merging the entered elements with the update selection,
      // apply operations to both.
      text.enter().append("text")
        .attr("class", "enter")
        .attr("x", function (d, i) {
          return i * 32;
        })
        .attr("dy", ".35em")
        .merge(text)
        .text(function (d) {
          return d;
        });

      // EXIT
      // Remove old elements as needed.
      text.exit().remove();
    }

    render() {
      return (
         <div id = {"#" + this.props.id } >
           <h1> Bytes dance randomly </h1>           
            <h2> { this.state.data} </h2> 
            <div ref = "canvas" > </div>
            <div ref = "BytesDance"></div>
            {/* <svg width={this.props.width} height={this.props.height}>{ this.state.data} </svg> */}
         </div>
      );
    }

}



export default BytesDance;