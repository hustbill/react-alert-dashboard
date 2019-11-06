import React, {
    Component
} from 'react';
import * as d3 from "d3";

class Ball extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);             
    }
    
    // Ball object - multiple balls can be created by instantiating new objects
    createNewBall(svg, x, y, id, color, aoa, weight) {    
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
        // var thisobj = this; // i like to use this instead of this. this many times not reliable particularly handling evnet
        // **** aoa is used only here -- earlier I was using to next move position.
        // Now aoa and speed together is velocity 
        this.vx = Math.cos(this.aoa) * this.jumpSize; // velocity x
        this.vy = Math.sin(this.aoa) * this.jumpSize; // velocity y
        this.initialVx = this.vx;
        this.initialVy = this.vy;
        this.initialPosX = this.posX;
        this.initialPosY = this.posY;

         // when speed changes, go to initial setting
         this.GoToInitialSettings = function (newjumpSize) {
           this.posX = this.initialPosX;
           this.posY = this.initialPosY;
           this.vx = Math.cos(this.aoa) * newjumpSize; // velocity x
           this.vy = Math.sin(this.aoa) * newjumpSize; // velocity y
           console.log(this.posX);
           console.log(this.posY);
            this.Draw();
         };

        this.Draw = function () {
          var svg = this.svg;
          var ball = svg.selectAll('#' + this.id)
            .data(this.data);
          ball.enter()
            .append("circle")
            .attr({
              "id": this.id,
              'class': 'ball',
              'r': this.radius,
              'weight': this.weight
            })
            .style("fill", this.color);
          ball
            //.transition()//.duration(50)
            .attr("cx", this.posX)
            .attr("cy", this.posY);
          // intersect ball is used to show collision effect - every ball has it's own intersect ball
          var intersectBall = ball.enter()
            .append('circle')
            .attr({
              'id': this.id + '_intersect',
              'class': 'intersectBall'
            });
        }
    }

     componentDidMount() {
       const data = [2, 4, 2, 6, 8];
       this.drawBarChart(data);
       var svg = this.Initialize('drawArea');
       console.log("svg " + JSON.stringify(svg));   
       
     }

     drawBarChart(data) {
       const canvasHeight = 100
       const canvasWidth = 150
       const scale = 20
       const svgCanvas = d3.select(this.refs.ball)
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

      

    //    Draw() {
    //      var svg = this.svg;
    //      var ball = svg.selectAll('#' + this.id)
    //        .data(this.data);
    //     ball.enter()
    //        .append("circle")
    //        .attr({
    //          "id": this.id,
    //          'class': 'ball',
    //          'r': this.radius,
    //          'weight': this.weight
    //        })
    //        .style("fill", this.color);
    //      ball
    //        //.transition()//.duration(50)
    //        .attr("cx", this.posX)
    //        .attr("cy", this.posY);
    //     //  intersect ball is used to show collision effect - every ball has it's own intersect ball
    //      var intersectBall = ball.enter()
    //        .append('circle')
    //        .attr({
    //          'id': this.id + '_intersect',
    //          'class': 'intersectBall'
    //        });
    //    };

       Move() {
         var svg = this.svg;
         //this.posX += Math.cos(this.aoa) * this.jumpSize;
         //this.posY += Math.sin(this.aoa) * this.jumpSize;
         this.posX += this.vx;
         this.posY += this.vy;
         if (parseInt(svg.attr('width')) <= (this.posX + this.radius)) {
           this.posX = parseInt(svg.attr('width')) - this.radius - 1;
           this.aoa = Math.PI - this.aoa;
           this.vx = -this.vx;
         }
         if (this.posX < this.radius) {
           this.posX = this.radius + 1;
           this.aoa = Math.PI - this.aoa;
           this.vx = -this.vx;
         }
         if (parseInt(svg.attr('height')) < (this.posY + this.radius)) {
           this.posY = parseInt(svg.attr('height')) - this.radius - 1;
           this.aoa = 2 * Math.PI - this.aoa;
           this.vy = -this.vy;
         }
         if (this.posY < this.radius) {
           this.posY = this.radius + 1;
           this.aoa = 2 * Math.PI - this.aoa;
           this.vy = -this.vy;
         }
         // **** NOT USING AOA except during initilization. Just left this for future reference ***** 
         if (this.aoa > 2 * Math.PI)
           this.aoa = this.aoa - 2 * Math.PI;
         if (this.aoa < 0)
           this.aoa = 2 * Math.PI + this.aoa;
         this.Draw();
       };


    CheckCollision(ball1, ball2) {
      var absx = Math.abs(parseFloat(ball2.posX) - parseFloat(ball1.posX));
      var absy = Math.abs(parseFloat(ball2.posY) - parseFloat(ball1.posY));

      // find distance between two balls.
      var distance = (absx * absx) + (absy * absy);
      distance = Math.sqrt(distance);
      // check if distance is less than sum of two radius - if yes, collision
      if (distance < (parseFloat(ball1.radius) + parseFloat(ball2.radius))) {
        return true;
      }
      return false;
    }

    //courtsey thanks to several internet sites for formulas
    //detect collision, find intersecting point and set new speed+direction for each ball based on weight (weight=radius)
    // ProcessCollision(ball1, ball2) {
    //    var balls = []; // global array representing balls

    //   if (ball2 <= ball1)
    //     return;
    //   if (ball1 >= (balls.length - 1) || ball2 >= balls.length)
    //     return;

    //   ball1 = balls[ball1];
    //   ball2 = balls[ball2];

    //   if (this.CheckCollision(ball1, ball2)) {
    //     // intersection point
    //     var interx = ((ball1.posX * ball2.radius) + ball2.posX * ball1.radius) /
    //       (ball1.radius + ball2.radius);
    //     var intery = ((ball1.posY * ball2.radius) + ball2.posY * ball1.radius) /
    //       (ball1.radius + ball2.radius);

    //     // show collision effect for 500 miliseconds
    //     var intersectBall = svg.select('#' + ball1.id + '_intersect');
    //     intersectBall.attr({
    //         'cx': interx,
    //         'cy': intery,
    //         'r': 5,
    //         'fill': 'black'
    //       })
    //       .transition()
    //       .duration(500)
    //       .attr('r', 0);

    //     // calculate new velocity of each ball.
    //     var vx1 = (ball1.vx * (ball1.weight - ball2.weight) +
    //       (2 * ball2.weight * ball2.vx)) / (ball1.weight + ball2.weight);
    //     var vy1 = (ball1.vy * (ball1.weight - ball2.weight) +
    //       (2 * ball2.weight * ball2.vy)) / (ball1.weight + ball2.weight);
    //     var vx2 = (ball2.vx * (ball2.weight - ball1.weight) +
    //       (2 * ball1.weight * ball1.vx)) / (ball1.weight + ball2.weight);
    //     var vy2 = (ball2.vy * (ball2.weight - ball1.weight) +
    //       (2 * ball1.weight * ball1.vy)) / (ball1.weight + ball2.weight);

    //     //set velocities for both balls
    //     ball1.vx = vx1;
    //     ball1.vy = vy1;
    //     ball2.vx = vx2;
    //     ball2.vy = vy2;

    //     //ensure one ball is not inside others. distant apart till not colliding
    //     while (this.CheckCollision(ball1, ball2)) {
    //       ball1.posX += ball1.vx;
    //       ball1.posY += ball1.vy;

    //       ball2.posX += ball2.vx;
    //       ball2.posY += ball2.vy;
    //     }
    //     ball1.Draw();
    //     ball2.Draw();
    //   }
    // }

    Initialize(containerId) {
      var balls = []; // global array representing balls
      var height = document.getElementById(containerId).clientHeight;
      var width = document.getElementById(containerId).clientWidth;
      console.log("height" + height);
      console.log("width" + width);
    //   var height = 50;
    //   var width = 50;
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

    //   balls.push(this.createNewBall(svg, 501, 101, 'n1', 'red', Math.PI / 6));
    //   balls.push(this.createNewBall(svg, 51, 31, 'n2', 'green', Math.PI / 3, 20));
    //   balls.push(this.createNewBall(svg, 201, 201, 'n3', 'yellow', Math.PI / 9, 90));
    //   balls.push(this.createNewBall(svg, 91, 31, 'n4', 'orange', Math.PI / 2, 15));
    //   balls.push(this.createNewBall(svg, 201, 21, 'n5', 'pink', Math.PI + Math.PI / 4, 15));
    //   balls.push(this.createNewBall(svg, 401, 41, 'n6', 'blue', Math.PI + Math.PI / 7, 25));

    //   for (var i = 0; i < balls.length; ++i) {
    //       console.log('balls.length: ' + balls.length);
    //       console.log('balls: ' +JSON.stringify(balls));
    //     balls[i].Draw();
    //   }
      return svg;
    }

    // var startStopFlag = null;

    // StartStopGame() {
    //   if (startStopFlag == null) {
    //     d3.timer(function () {
    //       for (var i = 0; i < balls.length; ++i) {
    //         var r = balls[i].Move();
    //         for (var j = i + 1; j < balls.length; ++j) {
    //           ProcessCollision(i, j);
    //         }
    //       }
    //       if (startStopFlag == null)
    //         return true;
    //       else
    //         return false;
    //     }, 500);
    //     startStopFlag = 1;
    //     document.getElementById('startStop').innerHTML = 'Stop';
    //   } else {
    //     startStopFlag = null;
    //     document.getElementById('startStop').innerHTML = 'Start';
    //   }
    // }

    // I always like to handle ESC key
    // d3.select('body')
    //   .on('keydown', function () {
    //     if (balls.length == 0)
    //       return;
    //     console.log(d3.event);
    //     if (d3.event.keyCode == 27) { // if ESC key - toggle start stop
    //       StartStopGame();
    //     }
    //   });

    // OnSpeedChange() {
    //   var o = document.getElementById('speed');
    //   if (startStopFlag != null)
    //     startStopFlag = null; // by setting startStopFlag to null, callback of d3.timer will return true and animation will stop

    //   setTimeout(function () { // go to initial position set new speed (ideally should not go to initial position)
    //     for (var i = 0; i < balls.length; ++i) {
    //       var o = document.getElementById('speed');
    //       newjumpSize = o.options[o.selectedIndex].value;
    //       balls[i].GoToInitialSettings(parseInt(newjumpSize));
    //     }
    //     setTimeout(function () {
    //       StartStopGame();
    //     }, 1000);
    //   }, 500);
    // }

    // OnNumberOfBallsChanged() {
    //   var o = document.getElementById('numberOfBalls');
    //   numberOfBalls = o.options[o.selectedIndex].value;
    //   balls = balls.slice(0, 6);

    //   d3.selectAll('.ball').remove();
    //   //keep pushing as many balls you want..
    //   for (var i = 6; i < numberOfBalls; ++i) {
    //     balls.push(new Ball(svg, 101, 101, 'n' + (i + 1).toString(), color(i), Math.PI / (i + 1), (i % 2) == 0 ? 10 : (10 + i)));
    //   }
    // }

    render() {
    //    var balls = []; // global array representing balls
    //    var color = d3.scaleOrdinal('schemeCategory20');
    //     var svg = this.Initialize('drawArea');
        // this.StartStopGame();

       const mainDivStyle = {
         width: '960px',
         height: '480px',
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
                    <select id='speed'>
                        <option value="1" selected="selected">Slow</option>
                        <option value="3" >Medium</option>
                        <option value="5">Fast</option>
                    </select> |
                    Number of Balls : 
                    {/* <select id='numberOfBalls' onchange="OnNumberOfBallsChanged()"> */}
                    < select id = 'numberOfBalls'>
                        <option value="5" selected="selected">6</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                {/* <div id="drawArea" style=width:100%; height:100%; border:1px solid gray"> */}
                <div id="drawArea" style={drawAreaStyle}>
                </div>
            </div>
        </div>
       );
     }
}



export default Ball;