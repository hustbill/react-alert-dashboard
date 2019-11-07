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
  this._drawBalls(el, state.data, scales, prevScales);

  // var startStopFlag = null;
  // this.StartStopGame(startStopFlag, el, scales, state.data, prevScales, dispatcher);

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

ns._drawBalls = function (el, data, scales, prevScales) {
  // this.Draw(el, data, scales, prevScales);
  
  // d3.interval(this.Move(el, data, scales, prevScales), 500);
  setInterval(this.Move(el, data, scales, prevScales), 500);
  // d3.interval(function () {
  //   this.Move(el, data, scales, prevScales);
  // }, 1500);

  
}

ns.Draw = function (el, data, scales, prevScales) {
 console.log(JSON.stringify(data));
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
      // .duration(ANIMATION_DURATION)
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

ns.Move = function (el, thisobj, scales, prevScales) {
  console.log("move");
  console.log(JSON.stringify(thisobj));
  const {
    x,
    y,
    id,
    color,
    aoa,
    weight
  } = thisobj;

  
   this.posX = x; // cx
   this.posY = y; // cy
   this.color = color;
   this.radius = weight; // radius and weight same
   this.jumpSize = 3; // equivalent of speed default to 1
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

   // **** aoa is used only here -- earlier I was using to next move position.
   // Now aoa and speed together is velocity 
   this.vx = Math.cos(this.aoa) * this.jumpSize; // velocity x
   this.vy = Math.sin(this.aoa) * this.jumpSize; // velocity y
   this.initialVx = this.vx;
   this.initialVy = this.vy;
   this.initialPosX = this.posX;
   this.initialPosY = this.posY;
  var svg = d3.select(el).selectAll('.d3-points');
  //thisobj.posX += Math.cos(thisobj.aoa) * thisobj.jumpSize;
  //thisobj.posY += Math.sin(thisobj.aoa) * thisobj.jumpSize;
  var width = 800;
  var height = 600;

  thisobj.posX += thisobj.vx;
  thisobj.posY += thisobj.vy;

  // if (parseInt(svg.attr('width')) <= (thisobj.posX + thisobj.radius)) {
    // thisobj.posX = parseInt(svg.attr('width')) - thisobj.radius - 1;
    if (width <= (thisobj.posX + thisobj.radius)) {
    thisobj.posX =width - thisobj.radius - 1;
    thisobj.aoa = Math.PI - thisobj.aoa;
    thisobj.vx = -thisobj.vx;
  }

  if (thisobj.posX < thisobj.radius) {
    thisobj.posX = thisobj.radius + 1;
    thisobj.aoa = Math.PI - thisobj.aoa;
    thisobj.vx = -thisobj.vx;
  }

  // if (parseInt(svg.attr('height')) < (thisobj.posY + thisobj.radius)) {    
  //   thisobj.posY = parseInt(svg.attr('height')) - thisobj.radius - 1;
   if (height < (thisobj.posY + thisobj.radius)) {
     thisobj.posY = height - thisobj.radius - 1;
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

  // thisobj.Draw();
    this.Draw(el, thisobj, scales, prevScales);
}

// ns.StartStopGame = function () {
//   if (startStopFlag == null) {
//     d3.timer(    
//        this.Move(el, scales, thisobj, prevScales), 500);
//     startStopFlag = 1;
//     // document.getElementById('startStop').innerHTML = 'Stop';
//   } else {
//     startStopFlag = null;
//     // document.getElementById('startStop').innerHTML = 'Start';
//   }
// }

module.exports = ns;
