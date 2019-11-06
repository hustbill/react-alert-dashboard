import React, {
    Component
} from 'react';
import * as d3 from "d3";

class Ball extends Component {
    constructor (props) {
      super(props);

      this.state = {
        balls: []
      };
    }
     componentDidMount() {
      //  this.Initialize('drawArea');    
     }

      componentDidUpdate() {
          this.Initialize('drawArea');
      }

     drawBarChart(data) {
       const canvasHeight = 100
       const canvasWidth = 150
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
     
 
    Ball(svg, x, y, id, color, aoa, weight) {
      this.posX = x; // cx
      this.posY = y; // cy
      this.color = color;
      this.radius = weight; // radius and weight same
      this.jumpSize = 1; // equivalent of speed default to 1
      this.svg = svg; // parent SVG
      this.id = id; // id of ball
      this.aoa = aoa; // initial angle of attack
      this.weight = weight;

      if (!this.aoa)
        this.aoa = Math.PI / 7;
      if (!this.weight)
        this.weight = 10;
      this.radius = this.weight;

      this.data = [this.id]; // allow us to use d3.enter()

      var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet

      // **** aoa is used only here -- earlier I was using to next move position.
      // Now aoa and speed together is velocity 
      this.vx = Math.cos(thisobj.aoa) * thisobj.jumpSize; // velocity x
      this.vy = Math.sin(thisobj.aoa) * thisobj.jumpSize; // velocity y
      this.initialVx = this.vx;
      this.initialVy = this.vy;
      this.initialPosX = this.posX;
      this.initialPosY = this.posY;

      // when speed changes, go to initial setting
      var newjumpSize = 10;
      
      // this.GoToInitialSettings(newjumpSize);
      // this.Move();
  
    }

    GoToInitialSettings(newjumpSize) {
      var thisobj = this;
      thisobj.posX = thisobj.initialPosX;
      thisobj.posY = thisobj.initialPosY;
      thisobj.vx = Math.cos(thisobj.aoa) * newjumpSize; // velocity x
      thisobj.vy = Math.sin(thisobj.aoa) * newjumpSize; // velocity y
      thisobj.Draw();
    }

    Move() {
        var thisobj = this;
        var svg = thisobj.svg;

        thisobj.posX += thisobj.vx;
        thisobj.posY += thisobj.vy;

        if (parseInt(svg.attr('width')) <= (thisobj.posX + thisobj.radius)) {
          thisobj.posX = parseInt(svg.attr('width')) - thisobj.radius - 1;
          thisobj.aoa = Math.PI - thisobj.aoa;
          thisobj.vx = -thisobj.vx;
        }

        if (thisobj.posX < thisobj.radius) {
          thisobj.posX = thisobj.radius + 1;
          thisobj.aoa = Math.PI - thisobj.aoa;
          thisobj.vx = -thisobj.vx;
        }

        if (parseInt(svg.attr('height')) < (thisobj.posY + thisobj.radius)) {
          thisobj.posY = parseInt(svg.attr('height')) - thisobj.radius - 1;
          thisobj.aoa = 2 * Math.PI - thisobj.aoa;
          thisobj.vy = -thisobj.vy;
        }

        if (thisobj.posY < thisobj.radius) {
          thisobj.posY = thisobj.radius + 1;
          thisobj.aoa = 2 * Math.PI - thisobj.aoa;
          thisobj.vy = -thisobj.vy;
        }

        // **** NOT USING AOA except during initilization. Just left this for future reference ***** 
        if (thisobj.aoa > 2 * Math.PI)
          thisobj.aoa = thisobj.aoa - 2 * Math.PI;
        if (thisobj.aoa < 0)
          thisobj.aoa = 2 * Math.PI + thisobj.aoa;
      }

    Draw(ball) {
        var thisobj = this;       
          ball.enter()
            .append("circle")
            .attr({
              "id": thisobj.id,
              'class': 'ball',
              'r': thisobj.radius,
              'weight': thisobj.weight
            })
            .style("fill", thisobj.color);
          ball
            //.transition()//.duration(50)
            .attr("cx", thisobj.posX)
            .attr("cy", thisobj.posY);
          // intersect ball is used to show collision effect - every ball has it's own intersect ball
          var intersectBall = ball.enter()
            .append('circle')
            .attr({
              'id': thisobj.id + '_intersect',
              'class': 'intersectBall'
            });
        }

     Initialize(containerId) {
       var balls = this.state.balls;
      //  var height = document.getElementById(containerId).clientHeight;

      //  var width = document.getElementById(containerId).clientWidth;
      var height = "500px";
      var width = "960px";

       var gContainerId = containerId;
       var gCanvasId = containerId + '_canvas';
       var gTopGroupId = containerId + '_topGroup';
       var svg = d3.select("#" + containerId).append("svg")      
         .attr("id", gCanvasId)
         .attr("width", width)
         .attr("height", height)
         .append("g")
         .attr("id", gTopGroupId)
         .attr("x", 0)
         .attr("y", 0)
         .attr("width", width)
         .attr("height", height)
         .style("fill", "none")
       //.attr("transform", "translate(" + 1 + "," + 1 + ")")
       ;

      //  balls.push(this.Ball(svg, 501, 101, 'n1', 'red', Math.PI / 6, 10));
       balls.push(this.Ball(svg, 51, 31, 'n2', 'green', Math.PI / 3, 20));
       balls.push(this.Ball(svg, 201, 201, 'n3', 'yellow', Math.PI / 9, 90));
       balls.push(this.Ball(svg, 91, 31, 'n4', 'orange', Math.PI / 2, 15));
       balls.push(this.Ball(svg, 201, 21, 'n5', 'pink', Math.PI + Math.PI / 4, 15));
       balls.push(this.Ball(svg, 401, 41, 'n6', 'blue', Math.PI + Math.PI / 7, 25));

       for (var i = 1; i < balls.length; ++i) {
            var svg = this.svg;
            var ball = svg.selectAll('#' + this.id)
              .data(this.data);
         this.Draw(ball);
       }
       return svg;
     }
    
    render() {
      const {
       svg, x, y, id, color, aoa, weight
      } = this.props;

      const containerId = 'drawArea';
      this.Initialize(containerId);

      const mainDivStyle = {
         width: '960px',
         height: '500px',
         border: '1px solid pink'
       };
       const drawAreaOuterStyle = {
           width: '100%',
           height: '100%'
       }

       const drawAreaStyle = {        
         width: '100%',
         height: '100%',
         border: '1px solid grey'
       }

        return (
          <div id="mainDiv" style={mainDivStyle}>
            <div id="drawAreaOuter" style={drawAreaOuterStyle}>
                <div id="menuTop" >
                    {/* <a id="startStop" href="javascript:StartStopGame()">Start</a> |  */}
                     <a id="startStop">Start</a> | 
                    Speed :
                    {/* <select id='speed' onchange="OnSpeedChange()"> */}
                    {/* <select id='speed'>
                        <option value="1" selected="selected">Slow</option>
                        <option value="3" >Medium</option>
                        <option value="5">Fast</option>
                    </select> | */}
                    Number of Balls : 
                    {/* <select id='numberOfBalls' onchange="OnNumberOfBallsChanged()"> */}
                    {/* < select id = 'numberOfBalls'>
                        <option value="5" selected="selected">6</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select> */}
                </div>
                <div id="drawArea" style={drawAreaStyle}> 
                  {/* <Ball />               */}
                </div>            
            </div>
        </div>  
        
      );
    }

}



export default Ball;