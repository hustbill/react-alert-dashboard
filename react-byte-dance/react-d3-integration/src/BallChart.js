/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var d3 = require('d3');

var d3Chart = require('./d3Chart');


require('./Chart.less');
 class Ball {
   constructor(svg, x, y, id, color, aoa, weight) {
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

     var thisobj = this; // i like to use this instead of this. this many times not reliable particularly handling evnet

     // **** aoa is used only here -- earlier I was using to next move position.
     // Now aoa and speed together is velocity 
     this.vx = Math.cos(this.aoa) * this.jumpSize; // velocity x
     this.vy = Math.sin(this.aoa) * this.jumpSize; // velocity y
     this.initialVx = this.vx;
     this.initialVy = this.vy;
     this.initialPosX = this.posX;
     this.initialPosY = this.posY;
   }

    Draw() {
        var thisobj = this;
      var svg = thisobj.svg;
      var ball = svg.selectAll('#' + thisobj.id)
        .data(thisobj.data);
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

    Move() {
          var thisobj = this;
      var svg = thisobj.svg;

      //thisobj.posX += Math.cos(thisobj.aoa) * thisobj.jumpSize;
      //thisobj.posY += Math.sin(thisobj.aoa) * thisobj.jumpSize;

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

      thisobj.Draw();
    }

 }

var BallChart = React.createClass({
  getDefaultProps: function() {
      
    return {
      width: '100%',
      height: '300px',
      balls: [],
      color: d3.scale.category20()
    };
  },

  dispatcher: null,

  componentDidMount: function() {
    var el = this.getDOMNode();
    var dispatcher = d3Chart.create(el, {
      width: this.props.width,
      height: this.props.height
    }, this.getChartState());
    // dispatcher.on('point:mouseover', this.showTooltip);
    // dispatcher.on('point:mouseout', this.hideTooltip);
    this.dispatcher = dispatcher;
    var svg = this.Initialize(el, 'drawArea');
    var startStopFlag = null;
    this.StartStopGame(startStopFlag);
  },

  componentDidUpdate: function(prevProps, prevState) {
    var el = this.getDOMNode();
    d3Chart.update(el, this.getChartState(), this.dispatcher);
     const containerId = 'drawArea';
     var svg = this.Initialize(el, 'drawArea'); 
     var startStopFlag = null;
     this.StartStopGame(startStopFlag);
  },


  getChartState: function() {
    var appState = this.props.appState;

    var tooltips = [];
    if (appState.showingAllTooltips) {
      tooltips = appState.data;
    }
    else if (appState.tooltip) {
      tooltips = [appState.tooltip];
    }

    return _.assign({}, appState, {tooltips: tooltips});
  },

    StartStopGame: function (startStopFlag) {
        var {balls} = this.props;

      if (startStopFlag == null) {
        d3.timer(function () {
          for (var i = 0; i < balls.length; ++i) {
            var r = balls[i].Move();
            // for (var j = i + 1; j < balls.length; ++j) {
            //   this.ProcessCollision(i, j);
            // }
          }
          if (startStopFlag == null)
            return true;
          else
            return false;
        }, 500);
        startStopFlag = 1;
        // document.getElementById('startStop').innerHTML = 'Stop';
      } else {
        startStopFlag = null;
        // document.getElementById('startStop').innerHTML = 'Start';
      }
    },

    //courtsey thanks to several internet sites for formulas
    //detect collision, find intersecting point and set new speed+direction for each ball based on weight (weight=radius)
    ProcessCollision(ball1, ball2) {

      if (ball2 <= ball1)
        return;
      if (ball1 >= (balls.length - 1) || ball2 >= balls.length)
        return;

      ball1 = balls[ball1];
      ball2 = balls[ball2];

      if (this.CheckCollision(ball1, ball2)) {
        // intersection point
        var interx = ((ball1.posX * ball2.radius) + ball2.posX * ball1.radius) /
          (ball1.radius + ball2.radius);
        var intery = ((ball1.posY * ball2.radius) + ball2.posY * ball1.radius) /
          (ball1.radius + ball2.radius);

        // show collision effect for 500 miliseconds
        var intersectBall = svg.select('#' + ball1.id + '_intersect');
        intersectBall.attr({
            'cx': interx,
            'cy': intery,
            'r': 5,
            'fill': 'black'
          })
          .transition()
          .duration(500)
          .attr('r', 0);

        // calculate new velocity of each ball.
        var vx1 = (ball1.vx * (ball1.weight - ball2.weight) +
          (2 * ball2.weight * ball2.vx)) / (ball1.weight + ball2.weight);
        var vy1 = (ball1.vy * (ball1.weight - ball2.weight) +
          (2 * ball2.weight * ball2.vy)) / (ball1.weight + ball2.weight);
        var vx2 = (ball2.vx * (ball2.weight - ball1.weight) +
          (2 * ball1.weight * ball1.vx)) / (ball1.weight + ball2.weight);
        var vy2 = (ball2.vy * (ball2.weight - ball1.weight) +
          (2 * ball1.weight * ball1.vy)) / (ball1.weight + ball2.weight);

        //set velocities for both balls
        ball1.vx = vx1;
        ball1.vy = vy1;
        ball2.vx = vx2;
        ball2.vy = vy2;

        //ensure one ball is not inside others. distant apart till not colliding
        while (this.CheckCollision(ball1, ball2)) {
          ball1.posX += ball1.vx;
          ball1.posY += ball1.vy;

          ball2.posX += ball2.vx;
          ball2.posY += ball2.vy;
        }
        ball1.Draw();
        ball2.Draw();
      }
    },

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
    },

    Initialize: function(el, containerId) {
         var svg = d3.select(el).selectAll('.d3-points');
        // var height = document.getElementById(containerId).clientHeight;

        // var width = document.getElementById(containerId).clientWidth;
        var height = "800px";
        var width = "600px";
        gContainerId = containerId;
        gCanvasId = containerId + '_canvas';
        gTopGroupId = containerId + '_topGroup';
        // var svg = d3.select("#" + containerId).append("svg")
        //     .attr("id", gCanvasId)
        //     .attr("width", width)
        //     .attr("height", height)
        //     .append("g")
        //     .attr("id", gTopGroupId)
        //     .attr("x", 0)
        //     .attr("y", 0)
        //     .attr("width", width)
        //     .attr("height", height)
        //     .style("fill", "none")
        // //.attr("transform", "translate(" + 1 + "," + 1 + ")")
        // ;
        const {balls} = this.props;
        balls.push(new Ball(svg, 501, 101, 'n1', 'red', Math.PI / 6, 10));
        balls.push(new Ball(svg, 51, 31, 'n2', 'green', Math.PI / 3, 20));
        balls.push(new Ball(svg, 201, 201, 'n3', 'yellow', Math.PI / 9, 30));
        balls.push(new Ball(svg, 91, 31, 'n4', 'orange', Math.PI / 2, 15));
        balls.push(new Ball(svg, 201, 21, 'n5', 'pink', Math.PI + Math.PI / 4, 15));
        balls.push(new Ball(svg, 401, 41, 'n6', 'blue', Math.PI + Math.PI / 7, 25));

        for (var i = 0; i < balls.length; ++i) {
            console.log("balls[i]: " + JSON.stringify(balls[i]));
            balls[i].Draw();
        }
        return svg;
    },

      

  render: function() {
     
    //    this.StartStopGame();
    return (
      <div className="Chart">
           {/* <a id="startStop" onClick={this.StartStopGame()}>Start</a> | Speed: */}
          <div id="drawArea"  style={{"width": "960px", "height": "500px", "border": "1px solid grey"}}> </div>
      </div>
      
    );
  } 
});

module.exports = BallChart;
