var EventEmitter = require('events').EventEmitter;
var d3 = require('d3');

require('./d3Chart.less');

var ANIMATION_DURATION = 3;

var ns = {};

ns.create = function(el, props, state) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  svg.append('g')
      .attr('class', 'd3-points');

  svg.append('g')
      .attr('class', 'd3-tooltips');

  var dispatcher = new EventEmitter();
  this.update(el, state, dispatcher);

  return dispatcher;
};

ns.update = function(el, state, dispatcher) {
  var scales = this._scales(el, state.domain);
  var prevScales = this._scales(el, state.prevDomain);
  // this._drawPoints(el, scales, state.data, prevScales, dispatcher);
  this._drawBalls(el, scales, state.data, prevScales, dispatcher);
};

ns._scales = function(el, domain) {
  if (!domain) {
    return null;
  }

  var width = el.offsetWidth;
  var height = el.offsetHeight;

  var x = d3.scale.linear()
    .range([0, width])
    .domain(domain.x);

  var y = d3.scale.linear()
    .range([height, 0])
    .domain(domain.y);

  var z = d3.scale.linear()
    .range([5, 20])
    .domain([1, 10]);



  return {x: x, y: y, z: z};
};

ns._drawPoints = function(el, scales, data, prevScales, dispatcher) {
  var g = d3.select(el).selectAll('.d3-points');

  var point = g.selectAll('.d3-point')
    .data(data, function(d) { return d.id; });

  point.enter().append('circle')
      .attr('class', 'd3-point')
      .attr('cx', function(d) {
        if (prevScales) {
          return prevScales.x(d.x);
        }
        return scales.x(d.x);
      })
    .transition()
      .duration(ANIMATION_DURATION)
      .attr('cx', function(d) { return scales.x(d.x); });

  point.attr('cy', function(d) { return scales.y(d.y); })
      .attr('r', function(d) { return scales.z(d.z); })
      .on('mouseover', function(d) {
        dispatcher.emit('point:mouseover', d);
      })
      .on('mouseout', function(d) {
        dispatcher.emit('point:mouseout', d);
      })
    .transition()
      .duration(ANIMATION_DURATION)
      .attr('cx', function(d) { return scales.x(d.x); });

  if (prevScales) {
    point.exit()
      .transition()
        .duration(ANIMATION_DURATION)
        .attr('cx', function(d) { return scales.x(d.x); })
        .remove();
  }
  else {
    point.exit()
        .remove();
  }
};

ns._drawBalls = function (el, scales, data, prevScales, dispatcher) {
  let {
    x,
    y,
    id,
    color,
    aoa,
    weight
  } = data;  

  this.posX = x; // cx
  this.posY = y; // cy
  this.color = color;
  this.radius = weight; // radius and weight same
  this.jumpSize = 1; // equivalent of speed default to 1
  // this.svg = svg; // parent SVG
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

  this.Draw(el, scales, data, prevScales); 
}

ns.Draw = function(el, scales, data, prevScales) {

  var g = d3.select(el).selectAll('.d3-points');

  var point = g.selectAll('.d3-point')
    .data(data, function (d) {
      return d.id;
    });

  point.enter().append('circle')
    .attr('class', 'd3-point')
    .attr('cx', function (d) {
      if (prevScales) {
        return prevScales.x(d.x);
      }
      return scales.x(d.x);
    })
    .transition()
    .duration(ANIMATION_DURATION)
    .attr('cx', function (d) {
      return scales.x(d.x);
    });

  point.attr('cy', function (d) {
      return scales.y(d.y);
    })
    .attr('r', function (d) {
      return scales.z(d.z);
    })
    .transition()
    .duration(ANIMATION_DURATION)
    .attr('cx', function (d) {
      return scales.x(d.x);
    });

  point.attr('weight', function (d) {
    return d.weight;
  }).style("fill", function (d) {
    return d.color;
  });

  if (prevScales) {
    point.exit()
      .transition()
      .duration(ANIMATION_DURATION)
      .attr('cx', function (d) {
        return scales.x(d.x);
      })
      .remove();
  } else {
    point.exit()
      .remove();
  }
}

ns.destroy = function(el) {

};

module.exports = ns;
