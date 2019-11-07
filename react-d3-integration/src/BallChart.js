/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var d3 = require('d3');

var Ball = require('./Ball');

require('./Chart.less');


var BallChart = React.createClass({
  getDefaultProps: function() {
      
    return {
      width: '800px',
      height: '600px',
      containerId: 'gameBoard',
      balls: [],
      color: d3.scale.category20()
    };
  },

  dispatcher: null,

  componentDidMount: function() {
    var el = this.getDOMNode();
    this.Initialize(el, this.props.containerId);
    var startStopFlag = null;
    this.StartStopGame(startStopFlag);
   
  },

  componentDidUpdate: function(prevProps, prevState) {
    var el = this.getDOMNode();    
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
    ProcessCollision: function(ball1, ball2) {
        var {balls} = this.props;

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
          .duration(250)
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

    CheckCollision: function(ball1, ball2) {
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
        var height = document.getElementById(containerId).clientHeight;
        var width = document.getElementById(containerId).clientWidth;
        
        const {balls} = this.props;
          var svg = d3.select("#" + containerId).append('svg') // d3 select div by id
            .attr('class', 'gameBoard')
            .attr('width', width)
            .attr('height', height);

          svg.append('g')
            .attr('class', 'd3Balls');
            
        balls.push(new Ball(svg, 501, 101, 'n1', 'red', Math.PI / 6, 10));
        balls.push(new Ball(svg, 51, 31, 'n2', 'green', Math.PI / 3, 20));
        balls.push(new Ball(svg, 201, 201, 'n3', 'yellow', Math.PI / 9, 30));
        balls.push(new Ball(svg, 91, 31, 'n4', 'orange', Math.PI / 2, 15));
        balls.push(new Ball(svg, 201, 21, 'n5', 'pink', Math.PI + Math.PI / 4, 15));
        balls.push(new Ball(svg, 401, 41, 'n6', 'blue', Math.PI + Math.PI / 7, 25));
        for (var i = 0; i < balls.length; ++i) {            
            balls[i].Draw();
        }
    },      

  render: function() {
    return (
      <div className="Chart" >     
         <div id="gameBoard"  style={{"width": "800px", "height": "600px", "border": "1px solid grey"}}> </div>
      </div>
      
    );
  } 
});

module.exports = BallChart;
